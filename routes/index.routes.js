var express = require('express');
var router = express.Router();
const querystring = require('querystring');
var ObjectId = require('mongodb').ObjectID;
const Quiz = require('../models/quiz')
const Examinee = require('../models/examinee')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'QnA'
  });
});

router.post('/register', async function (req, res, next) {
  const examinee = new Examinee();
  const quiz = new Quiz();
  if (await examinee.collection.findOne({
      examineeName: req.body.examineeName
    })) {
    let getData = await examinee.collection.findOne({
      examineeName: req.body.examineeName
    });
    let dataCount = await quiz.collection.find().count();

    if (getData.examineeAnswer.length < dataCount) {
      let pageNumber = getData.examineeAnswer.length + 1

      req.session.user = getData.examineeName
      req.session.userid = getData._id
      // res.send("continue quiz")
      res.redirect("quiz/" + pageNumber)
    } else {
      res.send("*******************")
    }

    // res.send("<alert>Second Time Not Allowed.</alert>")
  } else {
    var insertdata = await examinee.collection.insertOne({

      examineeName: req.body.examineeName,
      examineeAnswer: [],
      score: 0

    });
    const firstQ = 1;
    console.log("FIRSTQ : ", firstQ)
    console.log("examineeName", insertdata.ops[0]._id)
    // res.send("ok")
    // alert("lkddhjskjsfdhjfh .........")
    // res.send({})
    // res.redirect('quiz/'+firstQ)
    const query = querystring.stringify({
      "firstQ": firstQ,
      "examineeName": insertdata.ops[0].examineeName,
      "examineeID": insertdata.ops[0]._id,
    })
    req.session.user = insertdata.ops[0].examineeName
    req.session.userid = insertdata.ops[0]._id
    res.redirect('quiz/' + firstQ)
  }

});

router.get('/quiz/:pageNumber', async function (req, res, next) {
  console.log("QUIZ PAGE CALLED.");

  if (req.session.user) {
    const quiz = new Quiz();
    const nPerPage = 1;
    let pageNumber = req.params.pageNumber;
    let countTill = await quiz.collection.find().count();
    if (pageNumber > countTill) {
      res.render("yourscore")
    } else {
      console.log("PageNumber : ", pageNumber)

      async function quizPage(pageNumber, nPerPage) {

        var quizDetails = await quiz.collection.find()
          .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
          .limit(nPerPage)
          .toArray();

        return quizDetails;
      }

      let nextQ = parseInt(pageNumber) + 1;
      let sendData = {
        title: 'Quiz',
        items: await quizPage(pageNumber, nPerPage),
        nextQ: nextQ,
        examineeName: req.session.user,
        count: ((pageNumber - 1) * 20)
      };
      console.log("NextQ : ", nextQ)
      console.log("Count : ", countTill)
      // if (pageNumber > countTill) {
      //   res.redirect('http://localhost:3000/yourscore')
      // } else {
      //   res.render('quiz', sendData)
      // }
      res.render('quiz', sendData)
    }


  } else {
    res.send("********************")
  }

})

router.post('/scoreAnswer', async function (req, res, next) {
  console.log("Score Answer API Called . . . .")
  const examinee = new Examinee();
  console.log("examinee Answer qID : ", req.body.qID)

  /**   quiz data   */
  const quiz = new Quiz();
  let quizdata = await quiz.collection.findOne({
    _id: ObjectId(req.body.qID)
  })

  let scoreUpdate
  if (quizdata.ca == req.body.answer) {
    scoreUpdate = 1
  } else {
    scoreUpdate = 0
  }

  let answer
  if (req.body.answer) {
    console.log("REQUEST BODY IS NOT EMPTY")
    answer = req.body.answer
  } else {
    console.log("REQUEST BODY EMPTY")
    answer = null
  }

  let answerArray = [req.body.qID, answer]
  await examinee.collection.updateOne({
      examineeName: req.session.user
    }, {
      $push: {
        examineeAnswer: answerArray
      },
      $inc: {
        score: scoreUpdate
      }
    })
    .then(() => {
      console.log("Answer Updated")
    })

})

router.get('/yourscore', async function (req, res, next) {
  console.log("YOUR SCORE PAGE (API) CALLED . . . . .")
  if (req.session.user) {
    const quiz = new Quiz();
    const examinee = new Examinee();

    let examineeData = await examinee.collection.findOne({
      examineeName: req.session.user
    });

    console.log("Examinee Data : ", examineeData);
    req.session.destroy();
    res.render('yourscore', {
      data: examineeData
    })
  } else {
    res.send("************")
  }
})

router.get("/alldata", async function (req, res, next) {
  const quiz = new Quiz();
  var alldata = await quiz.collection.aggregate([{
    $sample: {
      size: 1
    }
  }]).toArray();
  console.log("All Data : ", alldata)
  res.send("OK")
})

router.get("/insertdata", async function (req, res, next) {
  const quiz = new Quiz();
  // var insertdata = await quiz.collection.insertMany([
  //   {
  //   q: "Marvel's First Movie?",
  //   a: ["Thor", "Iron Man", "Captain America"],
  //   ca: "Iron Man"
  // },
  // {
  //   q: "Planet of Soul Stone",
  //   a: ["Earth", "Vormir", "Nowhere"],
  //   ca: "Vormir"
  // },
  // {
  //   q: "God of Thunder",
  //   a: ["Thor", "Iron Man", "Captain America"],
  //   ca: "Thor"
  // },
  // {
  //   q: "Thor's new weapon",
  //   a: ["Mjolnir", "Stormbreaker", "Hammer"],
  //   ca: "Stormbreaker"
  // }

  // ]);
  console.log("All Data : ", insertdata)
  res.send("OK")
})
module.exports = router;
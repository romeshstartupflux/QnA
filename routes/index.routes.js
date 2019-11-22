var express = require('express');
var router = express.Router();
const querystring = require('querystring');

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
  if (await examinee.collection.findOne({
      examineeName: req.body.examineeName
    })) {

    res.send("<alert>Second Time Not Allowed.</alert>")
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

// router.get('/start/:query',async function(req, res, next){
//   console.log("Start Link Called. . . . . . .")
//   const quiz = new Quiz();
//   const firstQ = 1;
//   let newReq = querystring.parse(req.params.query);
//   req.session.user = newReq.examineeName;
//   console.log("Session : ",req.session.user )
//   // console.log("PageNumber : ", pageNumber)
//   console.log("FirstQ : ", newReq.firstQ)
//   console.log("Examinee Name", newReq.examineeName)
//   res.redirect('quiz/'+firstQ)
// });

router.get('/quiz/:pageNumber', async function (req, res, next) {
  console.log("QUIZ PAGE CALLED.");
  const quiz = new Quiz();
  const nPerPage = 1;
  let pageNumber = req.params.pageNumber;
  let countTill = await quiz.collection.find().count();
  
  
  // let newReq = querystring.parse(req.params.query)
  
  // let pageNumber = newReq.firstQ;
  // const examineeName = newReq.examineeName;
  // req.session.user = newReq.examineeName;
  // console.log("Session : ",req.session.user )
  console.log("PageNumber : ", pageNumber)
  // console.log("FirstQ : ", newReq.firstQ)
  // console.log("Examinee Name", newReq.examineeName)
  // console.log("Examinee ID : ", newReq.examineeID)

  async function quizPage(pageNumber, nPerPage) {

    var quizDetails = await quiz.collection.find()
      .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
      .limit(nPerPage)
      .toArray();

    console.log("QuizDetails : ", quizDetails)
    return quizDetails;
  }
  
  console.log("Count : ", countTill)
  let nextQ = parseInt(pageNumber) + 1;
  console.log("NextQ : ", nextQ)
  let sendData = {
    title: 'Quiz',
    items: await quizPage(pageNumber, nPerPage),
    nextQ: nextQ,
    examineeName: req.session.user
  };
  console.log("Send Data : ", sendData)
 
  console.log("session user id : ", req.session.userid)
  if(nextQ > countTill){
    res.send("Quiz Completed.")
  }
  else{
    res.render('quiz', sendData)
  }


  

})

router.post('/scoreAnswer', async function (req, res, next) {
  console.log("Score Answer API Called . . . .")
  const examinee = new Examinee();
  console.log("examinee Answer qID : ", req.body)
  let answerArray = [req.body.qID, req.body.answer]
  await examinee.collection.updateOne({
      examineeName: req.session.user
    }, {
      $push: {
        examineeAnswer: answerArray
      }
    })
    .then(() => {
      console.log("Answer Updated")
    })

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
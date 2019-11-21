var express = require('express');
var router = express.Router();
const querystring = require('querystring'); 

const Quiz = require('../models/quiz')
const Examinee = require('../models/examinee')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QnA' });
});


router.post('/register', async function(req, res, next){
  const examinee = new Examinee();
  var insertdata = await examinee.collection.insertOne({

    examineeName: req.body.examineeName,
    examineeAnswer :[],
    score : 0

  });
  const firstQ = 1;
  console.log("FIRSTQ : ",firstQ)
  console.log("examineeName", insertdata.ops[0]._id)
  // res.send("ok")
  // alert("lkddhjskjsfdhjfh .........")
  // res.send({})
  // res.redirect('quiz/'+firstQ)
  // const query = querystring.stringify({
  //   "firstQ":firstQ,
  //   "examineeName":insertdata.ops[0].examineeName,
  //   "examineeID": insertdata.ops[0]._id,
  // })
  res.redirect('quiz/'+firstQ)
});


router.get('/quiz/:pageNumber', async function(req, res, next){
  console.log("QUIZ PAGE CALLED.");
  const quiz = new Quiz();
  const nPerPage = 1;
  // let newReq = querystring.parse(req.params.query)
  let pageNumber = req.params.pageNumber;
  // const examineeName = newReq.examineeName;

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
  let countTill = await quiz.collection.find().count();
  let nextQ = parseInt(pageNumber)+1;
  console.log("NextQ : ", nextQ)
  let sendData = {title : 'Quiz', items: await quizPage(pageNumber, nPerPage), nextQ: nextQ};
  console.log("Send Data : ", sendData)
  res.render('quiz', sendData)

})



router.get("/alldata", async function(req,res, next){
  const quiz = new Quiz();
  var alldata = await quiz.collection.find().toArray();
  console.log("All Data : ", alldata)
  res.send("OK")
})

router.get("/insertdata", async function(req,res, next){
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

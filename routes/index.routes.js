var express = require('express');
var router = express.Router();

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
    examineeAnser :[],
    score : 0

  });
  const firstQ = 1;
  console.log("FIRSTQ : ",firstQ)
  // res.send("ok")
  // alert("lkddhjskjsfdhjfh .........")
  res.redirect('quiz/1')
  // res.render("/quiz")
});


router.get('/quiz/:pageNumber', async function(req, res, next){
  const quiz = new Quiz();
  const nPerPage = 1;
  let pageNumber = req.params.pageNumber;
  console.log("Print STR", pageNumber)

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

router.get("/insertdata", function(req,res, next){
  const quiz = new Quiz();
  var insertdata = quiz.collection.insertOne({
    q: "Marvel's First Movie?",
    a: ["Thor", "Iron Man", "Captain America"],
    ca: "Captain Marvel"
  });
  console.log("All Data : ", insertdata)
  res.send("OK")
})
module.exports = router;

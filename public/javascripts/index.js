function nextQ(nextQ) {
    console.log("NEXTQ CALLED ().")
    // let answerArray = [];
    // let score = 0;

    let answer = $("#answer").val();
    console.log("ANSWER : ", answer)
    console.log("VALUE : ", value)
    // answerArray.push(answer);

    // localStorage.setItem("answerArray", JSON.stringify(answerArray))

    $.ajax({
        type: "GET",
        url: "/quiz/"+nextQ,
        success: function(result){
            $("body").html(result)
        }
    })
}

function calculateScore(nextQ){
    let answer = $("answer").val();
    console.log(" A N S W E R  :" , answer)
    //nextQ(nextQ);
}

function startQ() {
    const qNumber = 1;

    let examineeName = $("#examineeName").val();
    console.log("Examinee Name : ",examineeName);
    $.ajax({
        method: "POST",
        url: "/register",
        data: ({"examineeName" : examineeName}),
        success : function(result){
            // console.log("Result yaha pe hai")
            // alert("hogya.............!")
            $("body").html(result)
            // return nextQ(qNumber);
        }
    });

    // nextQ(qNumber);
}
function nextQ(nextQ) {
    console.log("NEXTQ CALLED ().")

    let answer = $("input:radio[name=answer]:checked").val();
    let qID = $("#qID").val()
    console.log("qID : ", qID)
    console.log("ANSWER : ", answer)

    scoreAnswer(answer, qID)
    if(nextQ == 999){
        $.ajax({
            type: "GET",
            url: "/yourscore",
            // async: false,
            success: function(result){
                // scoreAnswer(answer, qID)
                console.log("yourscore ajax called")
                $("body").html(result)            
            }
        })
    }
    else{
        $.ajax({
            type: "GET",
            url: "/quiz/"+nextQ,
            async: false,
            success: function(result){
                // scoreAnswer(answer, qID)
                $("body").html(result)            
            }
        })
    }
    
}

function scoreAnswer(answer, qID){
    console.log("Score Answer Called . . . .")
    $.ajax({
        type: 'POST',
        url: '/scoreAnswer',
        // async: false,
        data: ({"answer" : answer, "qID" : qID}),
        success: function(result){
             return console.log("Score Updated Successfully.")
        }
    })
}

function startQ() {
    console.log("STARTQ FUNCTION CALLED.")
    const qNumber = 1;

    let examineeName = $("#examineeName").val();
    console.log("Examinee Name : ",examineeName);
    $.ajax({
        method: "POST",
        url: "/register",
        // async: false,
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

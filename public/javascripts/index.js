function nextQ(nextQ) {
    console.log("NEXTQ CALLED ().")

    let answer = $("input:radio[name=answer]:checked").val();
    console.log("ANSWER : ", answer)

    $.ajax({
        type: "GET",
        url: "/quiz/"+nextQ,
        success: function(result){
            $("body").html(result)
        }
    })
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
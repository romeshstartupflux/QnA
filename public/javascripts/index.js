function nextQ(nextQ) {

    // let xhttp = new XMLHttpRequest();
    // if (nextQ == "") {
    //     document.getElementById("quiz").innerHTML = "";
    //     return;
    // }
    // xhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {

    //         document.getElementById("body").innerHTML = this.responseText;
    //     }
    // };
    // xhttp.open("GET", "/quiz/" + nextQ, true);
    // xhttp.send();
    console.log("NEXTQ CALLED ().")
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
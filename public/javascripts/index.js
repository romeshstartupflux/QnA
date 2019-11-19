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
    $.ajax({
        type: "GET",
        url: "/quiz/"+nextQ,

        success: function(result){
            $("body").html(result)
        }
    })
}

function calculateScore(){
    let answer = 0;
    nextQ(nextQ);
}

function startQ() {
    const qNumber = 1;
    nextQ(qNumber);
}
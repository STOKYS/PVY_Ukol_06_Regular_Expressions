$("#sign>input").on("input", function () {

})

$("#submit").on("click", function () {
    if (document.getElementById("log").style.display == "block") {
        
    } else {
        user.data.push({
            name: document.getElementById("realname").value,
            user: document.getElementById("username").value,
            mail: document.getElementById("email").value,
            pswd: document.getElementById("password").value
        });
    }
})


/* Použil jsem pouhý objekt namísto souboru, jelikož jsem chtěl aby to fungovalo i na GitHubu*/

let user = {
    data: []
}
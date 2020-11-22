$("#sign>input").on("input", function () {

})

$("#submit").on("click", function () {
    console.log("dd")
    if (document.getElementById("log").style.display == "block") {

    } else {
        user = {
            name: document.getElementById("realname").value,
            user: document.getElementById("username").value,
            mail: document.getElementById("email").value,
            pswd: document.getElementById("password").value
        };
        let string = validate()
        document.getElementById("err").innerHTML = string
    }
})


function validate(){
    for (const item in user){
        if (user[item] == ''){
            return "<p>Please, fill in all the inputs</p>"
        }
    }
    let string = '<p>'
    if((user.mail.search(new RegExp("@")) == -1)){
        string += "- @ is missing from email adress<br>"
    } if((user.name.search(new RegExp(" [A-Z]")) == -1) || user.name.search(new RegExp('[0-9]')) != -1){
        string += "- Invalid name<br>"
    } if(user.user.search(new RegExp("[A-Z0-9]")) != -1){
        string += "- Uppercase letter or number in username<br>"
    } if(user.pswd.search(new RegExp(" ")) != -1){
        string += "- Spacebar in password"
    }
    string += "</p>"
    return string
}

/* Použil jsem pouhý objekt namísto zápisu do souboru, jelikož jsem chtěl aby to fungovalo i na GitHubu*/

let user = {}


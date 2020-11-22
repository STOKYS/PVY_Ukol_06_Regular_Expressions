let user = {}
let f = 0;
let interval = ""

$("#submit").on("click", function () {
    console.log("dd")
    if (document.getElementById("log").style.display == "block") {
        let string = login()
        if (string == "success"){
            document.getElementById("name").innerText = user.name
        } else {
            document.getElementById("name").innerText = "NAME SURNAME"
        }
        back()
        document.getElementById("success").style.display = "block"
        interval = setInterval(success_remove, 2000);
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
    document.getElementById("errors").style.display = "none"
    for (const item in user){
        if (user[item] == ''){
            document.getElementById("errors").style.display = "block"
            return "<p>Please, fill in all the inputs</p>"
        }
    }
    let string = '<p>'
    if((user.mail.search(new RegExp("^[A-Za-z]+[@]{1}[a-z]+[\.]{1}[a-z]+$")) == -1)){
        string += "- Email is invalid<br>"
    } if((user.name.search(new RegExp("^[A-Z]{1}[a-z]+[ ]{1}[A-Z]{1}[a-z]+$")) == -1) || user.name.search(new RegExp('![A-Za-z ]')) != -1){
        string += "- Invalid name<br>"
    } if(user.user.search(new RegExp("^[a-z]+[A-Za-z]?$")) == -1){
        string += "- Username must start with lowercase letter and can only contain a-z letters<br>"
    } if(user.pswd.search(new RegExp(" ")) != -1 || user.pswd.search(new RegExp("[A-Za-z0-9]{8,}")) == -1){
        string += "- Password can't have spaces, must have at least 8 uppercase, lowercase letters or numbers"
    }
    if(string != '<p>'){
        document.getElementById("errors").style.display = "block"
        user = {}
    } else {
        back()
        document.getElementById("success").style.display = "block"
        interval = setInterval(success_remove, 2000);
    }
    string += "</p>"
    return string
}

function login(){
    if(user.pswd == document.getElementById("logpswd").value){
        if(document.getElementById("logname").value.search(new RegExp("@") != -1) && user.mail == document.getElementById("logname").value){
            return "success"
        } else {
            if(user.user == document.getElementById("logname").value){
                return "success"
            }
        }
    } else {
        return "fail"
    }
}

function success_remove(){
    if(f != 0) {
        f = -1 
        clearInterval(interval)
        document.getElementById("success").style.display = "none"
    }
    f++
}
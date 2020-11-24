let user = {
    name: [],
    user: [],
    mail: [],
    pswd: []
}
let f = 0;
let interval = ""

// Funkce na načtení cookies do objektu user, po potvrzení o souhlasu
document.getElementById("cookies").addEventListener("click", function () {
    if (document.cookie != '') {
        let biscuit = document.cookie
        user = JSON.parse(biscuit)
    }
    document.getElementById("cookiesAlert").style.display = "none"
})

// Funkce na uložení objektu user do cookies
function store_cookie() {
    let biscuit = JSON.stringify(user)
    document.cookie = biscuit
}

// Při kliknutí submit
$("#submit").on("click", function () {
    // Jelikož používám stejné tlačítko Submit na loginu i signupu, tak program musí prvně rozhodnout o co se jedná
    if (document.getElementById("log").style.display == "block") {
        let string = login()
        if (string[0] == "success") {
            document.getElementById("name").innerText = user.name[string[1]]
            back()
            document.getElementById("success").style.display = "block"
            interval = setInterval(success_remove, 2000);
        } else {
            document.getElementById("name").innerText = "NAME SURNAME"
        }
    } else {
        user.name.push(document.getElementById("realname").value)
        user.user.push(document.getElementById("username").value)
        user.mail.push(document.getElementById("email").value)
        user.pswd.push(document.getElementById("password").value)
        let string = (isFull() == false) ? "<p>Please fill in all the inputs</p>" : validate()
        document.getElementById("err").innerHTML = string
    }
})

// Validuje zadané hodnoty s využitím Regular expressions, zda-li nejsou program vypíše chybovou hlášku a navrhne uživateli možnou opravu
function validate() {
    let index = user.name.length - 1
    document.getElementById("errors").style.display = "none"
    let string = '<p>'
    // Víme že každý email začíná písmenem a může pokračovat jakkoliv v rozmezí abecedy a čísel, poté přichází zavináč, následuje emailový poskytovatel a poté tečka a značka
    if ((user.mail[index].search(new RegExp("^[A-Za-z0-9]+[@]{1}[a-z]+[\.]{1}[a-z]+$")) == -1)) {
        string += "- Email is invalid<br>"
    }
    // Víme že každé jméno začíná na velké písmeno a obsahuje a skládá se ze dvou slov rozdělenou mezerou (nepočítáme se trojslovnými jmény)
    if ((user.name[index].search(new RegExp("^[A-Z]{1}[a-z]+[ ]{1}[A-Z]{1}[a-z]+$")) == -1) || user.name[index].search(new RegExp('![A-Za-z ]')) != -1) {
        string += "- Invalid name<br>"
    }
    // Zde jsem si kritéria pouze vymyslel, musí začínat malým písmenem a pokračovat jakým koliv písmenem v abecedě
    if (user.user[index].search(new RegExp("^[a-z]+[A-Za-z]?$")) == -1) {
        string += "- Username must start with lowercase letter and can only contain a-z (Upper and lower case) letters<br>"
    }
    // Zde je limit na všechy písmena abecedy + čísla, minimální délka je 8 znaků
    if (user.pswd[index].search(new RegExp(" ")) != -1 || user.pswd[index].search(new RegExp("[A-Za-z0-9]{8,}")) == -1) {
        string += "- Password can't have spaces, must have at least 8 uppercase, lowercase letters or numbers"
    }
    if (string != '<p>') {
        document.getElementById("errors").style.display = "block"
        remove_last()
    } else {
        // Vyvolá funkci na uložení do cookies
        store_cookie()
        back()
        document.getElementById("success").style.display = "block"
        interval = setInterval(success_remove, 1000);
    }
    string += "</p>"
    return string
}

// Funkce zjistí zda jsou všecny pole zaplněná
function isFull() {
    let i = 0
    // Chytrý for in loop, porovnává poslední string v arraji s "", pokud se rovná true znamená to že nějaké pole nebylo vyplěno a ukazuje se chybová hláška
    for (let property in user) {
        let j = user.name.length - 1
        let x = user[property]
        if (x[j] == '') {
            document.getElementById("errors").style.display = "block"
            i++
            break
        }
    }
    if (i != 0) {
        remove_last()
        return false
    } else {
        return true
    }
}

// Funkce odstraní poslední string ze všech arrajů v objeku user, pokud zadané hodnoty nebyly platné
function remove_last() {
    for (let property in user) {
        user[property].splice(user.name.length - 1, 1)
    }
}

// Funkce použitá při log-inu
function login() {
    // Pro všechy uživatele
    for (i = 0; i < user.user.length; i++) {
        // Prvně zjistí jestli zadané heslo souhlasí s heslem v objektu user na indexu i
        if (user.pswd[i] == document.getElementById("logpswd").value) {
            // Poté zjistí zda do políčka byl zadán email nebo jméno, pokud se rovnají: Přihlášení bylo uspěšné
            if (document.getElementById("logname").value.search(new RegExp("@") != -1) && user.mail[i] == document.getElementById("logname").value) {
                return ["success", i]
            } else {
                if (user.user[i] == document.getElementById("logname").value) {
                    return ["success", i]
                }
            }
        }
    }
    return ["fail", 0]
}

function success_remove() {
    if (f != 0) {
        f = -1
        clearInterval(interval)
        document.getElementById("success").style.display = "none"
    }
    f++
}

document.getElementById("clear").addEventListener("click", function () {
    // Myslel jsem že toto postačí, ale nefunguje to
    /*document.cookie = ""
    user = {
        name: [],
        user: [],
        mail: [],
        pswd: []
    }*/
})
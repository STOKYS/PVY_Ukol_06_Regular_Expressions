$("#btn>button").on("click", function(){
    document.getElementById(this.id.slice(0, -2)).style.display = "block"
    document.getElementById("btn").style.display = "none"
    document.getElementById("btns").style.display = "block"
})

$("#back").on("click", function(){
    document.getElementById("log").style.display = "none"
    document.getElementById("sign").style.display = "none"
    document.getElementById("btns").style.display = "none"
    document.getElementById("btn").style.display = "block"
})
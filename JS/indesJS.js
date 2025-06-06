
function wechselSeite() {
    if(window.matchMedia('(hover: hover)').matches){
        window.location.href = "Seiten/parkhaeuser.html";
    } else{
        const schranke = document.getElementById("schranke");
        schranke.classList.add("schrankeanimation");
        setTimeout(function() { 
            window.location.href = "Seiten/parkhaeuser.html";
        }, 500)
    }
  }
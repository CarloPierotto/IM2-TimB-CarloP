
function wechselSeite() {
    if(window.innerWidth < 800){
        const schranke = document.getElementById("schranke");
        schranke.classList.add("schrankeanimation");
        setTimeout(function() { 
            window.location.href = "Seiten/parkhaeuser.html";
        }, 1000)
    } else{
        window.location.href = "Seiten/parkhaeuser.html";
    }
  }
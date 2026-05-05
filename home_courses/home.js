const toggle = document.getElementById("themeToggle");



if(localStorage.getItem("theme") === "2nd-theme"){
    document.body.classList.add("2nd-theme");
    toggle.checked = true;
}



toggle.addEventListener("change", function(){

    if(toggle.checked){

        document.body.classList.add("2nd-theme");
        localStorage.setItem("theme","2nd-theme");

    }else{

        document.body.classList.remove("2nd-theme");
        localStorage.setItem("theme","dark");

    }

});
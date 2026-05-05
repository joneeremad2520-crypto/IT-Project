(function () {

    const menuButton = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu");
    const logo = document.querySelector(".logo");


  
    if (menuButton && menu) {

        menuButton.onclick = function () {

            menu.classList.toggle("active");

        };

    }


    
    if (logo) {

        logo.onclick = function () {

            window.location.href = "index.html";

        };

    }


    
    const buttons = document.querySelectorAll(".btn");

    for (let i = 0; i < buttons.length; i++) {

        buttons[i].onclick = function () {

            let text = this.innerText;


            if (text == "About Us") {

                window.location.href = "about.html";

            }

            else if (text == "Sign Up") {

                window.location.href = "signup.html";

            }

            else if (text == "Search") {

               window.location.href = "search2.html";

            }

            else if (text == "View Courses") {

                window.location.href = "courses.html";

            }

        };

    }

})();
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
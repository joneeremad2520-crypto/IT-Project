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

               window.location.href = "search.html";

            }

            else if (text == "View Courses") {

                window.location.href = "courses.html";

            }

        };

    }

})();

let links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

function joinNow() {
    alert("Welcome! Start your Computer Science journey 🚀");
}

let topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

let sections = document.querySelectorAll(
    ".TOP, .images, .content, .learn-do, .features"
);

sections.forEach(sec => {
    sec.classList.add("hidden");
});


window.addEventListener("scroll", () => {
    sections.forEach(sec => {
        let position = sec.getBoundingClientRect().top;

        if (position < window.innerHeight - 100) {
            sec.classList.add("show");
            sec.classList.remove("hidden");
        }
    });
});



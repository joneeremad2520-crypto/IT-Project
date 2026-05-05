
function join(){
  showToast("Welcome to CS Club 🚀");
}


function showToast(message){
  const toast = document.createElement("div");
  toast.innerText = message;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#ffd43b";
  toast.style.color = "black";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}


window.addEventListener("load", () => {
  showElements();
});


window.addEventListener("scroll", () => {
  showElements();
});

function showElements(){
  const elements = document.querySelectorAll(".about, .skills, .end");

  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if(position < screenHeight - 50){
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
}
    
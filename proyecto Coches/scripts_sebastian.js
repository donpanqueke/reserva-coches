// Toggle nav menu
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

// Slider automático
let current = 0;
const slides = document.querySelectorAll(".slide");

setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}, 4000);

// Modo oscuro
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("dark", document.body.classList.contains("dark-mode"));
}

// Restaurar preferencia
if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark-mode");
}

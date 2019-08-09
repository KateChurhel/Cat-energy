//Меню сайта
let navMain = document.querySelector(".main-nav");
let navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");
navToggle.onclick = function() {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
};

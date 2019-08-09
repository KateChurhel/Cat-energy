//Проверка формы
let inputReq = document.querySelectorAll(".form__input[required]");
let btnSubmit = document.querySelector(".form__btn");

btnSubmit.onclick = function() {
  for (let i=0; i<inputReq.length; i++){
    if (inputReq[i].value == "") {
      inputReq[i].classList.add("form__input--invalid");
    } else {
      inputReq[i].classList.remove("form__input--invalid");
    }
  }
};

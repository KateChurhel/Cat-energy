let sliderBar = document.querySelector(".slider__bar");
let sliderToggle = sliderBar.querySelector(".slider__toggle");
let imageBefore = document.querySelector(".slider__image-wrapper--before");
let imageAfter = document.querySelector(".slider__image-wrapper--after");
let labelBefore = document.querySelector(".slider__label--before");
let labelAfter = document.querySelector(".slider__label--after");
let widthContainer;
let itemCoordsLeft;
let right;
let shiftX;


/**
 * Слайдер для обычных экранов (компьютеров)
 */
function sliderDesktop() {
  imageBefore.classList.add("slider__image-wrapper--active");
  imageAfter.classList.remove("slider__image-wrapper--active");
  if (widthContainer > 767) {
    let sliderClientCoords = sliderBar.getBoundingClientRect();
    let sliderCoordsLeft = sliderClientCoords.left + pageXOffset;

    sliderToggle.onmousedown = function(e) {
      let itemClientCoords = sliderToggle.getBoundingClientRect();
      itemCoordsLeft = itemClientCoords.left + pageXOffset;
      right = sliderBar.offsetWidth - sliderToggle.offsetWidth;
      shiftX = e.pageX - itemCoordsLeft;

      document.onmousemove = function(e) {
        let newLeft = e.pageX - sliderCoordsLeft - shiftX;
        moveToggle(newLeft, right);
        return false;
      };

      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
    initLabel();
  } else {
    sliderMobile();
  }
}

/**
 * Слайдер для Планшетов
 */
function sliderTablet() {
  imageBefore.classList.add("slider__image-wrapper--active");
  imageAfter.classList.remove("slider__image-wrapper--active");
  if (widthContainer > 767) {
    let sliderClientCoords = sliderBar.getBoundingClientRect();
    let sliderCoordsLeft = sliderClientCoords.left + pageXOffset;

    sliderToggle.ontouchstart = function(event) {

      let itemClientCoords = sliderToggle.getBoundingClientRect();
      itemCoordsLeft = itemClientCoords.left + pageXOffset;

      right = sliderBar.offsetWidth - sliderToggle.offsetWidth;
      shiftX = event.touches[0].pageX - itemCoordsLeft;

    };

    sliderToggle.ontouchmove = function(event) {
      let newLeft = event.targetTouches[0].pageX - sliderCoordsLeft - shiftX;
      moveToggle(newLeft, right);
    };

    initLabel();
  } else {

    sliderMobile();
  }
}

/**
 * Инициализируем кнопки было/стало
 */
function initLabel() {
  right = sliderBar.offsetWidth - sliderToggle.offsetWidth;

  labelBefore.onclick = function(event) {
    let newWidth = sliderToggle.style.left ? (parseInt(sliderToggle.style.left) - 20) : 30;
    if (newWidth <= 0) {
      newWidth = 0;
      imageAfter.style.width = "calc(" + (100 - newWidth) + "% + 40px)";
      imageBefore.style.width = newWidth + "%";
    } else {
      imageBefore.style.width = "calc(" + newWidth + "% + 40px)";
      imageAfter.style.width = 100 - newWidth + "%";
    }
    sliderToggle.style.left = newWidth + "%";
  };

  labelAfter.onclick = function(event) {
    let newWidth = sliderToggle.style.left ? (parseInt(sliderToggle.style.left) + 20) : 70;
    if (newWidth >= 100) newWidth = 100;
    imageBefore.style.width = "calc(" + newWidth + "% + 40px)";
    imageAfter.style.width = 100 - newWidth + "%";
    sliderToggle.style.left = newWidth + "%";
  };
}

/**
 * Перемещаем  toggle
 * @param  {Number} newLeft Новая координата по Х
 * @param  {Number} right   Ширина свободного пространсва
 */
function moveToggle(newLeft, right) {
  if (newLeft < 0) newLeft = 0;
  if (newLeft > right) newLeft = right;
  let newWidth = Math.round(newLeft / right * 100);
  imageBefore.style.width = "calc(" + newWidth + "% + 40px)";
  imageAfter.style.width = 100 - newWidth + "%";
  if (newWidth == 0) {
    imageAfter.style.width = "calc(" + (100 - newWidth) + "% + 40px)";
    imageBefore.style.width = newWidth + "%";
  }
  sliderToggle.style.left = newWidth + "%";
}

/**
 * Слайдер для мобильных
 */
function sliderMobile() {
  imageAfter.style = "";
  imageBefore.style = "";
  sliderToggle.style = "";
  document.onmousedown = null;
  sliderToggle.onclick = function() {
    if (parseInt(getComputedStyle(sliderToggle).marginLeft) > 6) {
      before();
    } else {
      after();
    }
  };

  labelBefore.onclick = function() {
    before();
  };

  labelAfter.onclick = function() {
    after();
  };

  /**
   * Кнопка "Было"
   */
  function before() {
    sliderToggle.style.marginRight = "auto";
    sliderToggle.style.marginLeft = "";
    imageBefore.classList.add("slider__image-wrapper--active");
    imageAfter.classList.remove("slider__image-wrapper--active");
  }

  /**
   * Кнопка "Стало"
   */
  function after() {
    sliderToggle.style.marginRight = "";
    sliderToggle.style.marginLeft = "auto";
    imageBefore.classList.remove("slider__image-wrapper--active");
    imageAfter.classList.add("slider__image-wrapper--active");
  }
}

window.onresize = initSlider;

/**
 * Инициализация слайдера
 */
function initSlider() {
  widthContainer = document.querySelector(".container").offsetWidth;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    if (widthContainer > 767) {
      sliderTablet();
    } else {
      sliderMobile();
    }
  } else {
    sliderDesktop();
  };
};

initSlider();

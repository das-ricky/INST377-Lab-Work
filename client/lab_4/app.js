/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-restricted-syntax */
let slidePosition = 0;
const slides = document.querySelectorAll('.photo-grid-item');
const totalSlides = slides.length;

function updatePosition() {
  for (const slide of slides) {
    slide.classList.remove('photo-grid-item-visible');
    slide.classList.add('photo-grid-item-hidden');
  }

  slides[slidePosition].classList.add('photo-grid-item-visible');
}

function nextSlide() {
  console.log('next button clicked');
  document.querySelector('#button-prev').classList.remove('carousel-button-pressed');
  document.querySelector('#button-next').classList.add('carousel-button-pressed');
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updatePosition();
}
function prevSlide() {
  console.log('prev button clicked');
  document.querySelector('#button-next').classList.remove('carousel-button-pressed');
  document.querySelector('#button-prev').classList.add('carousel-button-pressed');
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  updatePosition();
}

document.querySelector('#button-prev').addEventListener('click', function() {
  prevSlide();
})
document.querySelector('#button-next').addEventListener('click', function() {
  nextSlide();
})
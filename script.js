import { places } from './data.js'

const wrapper = document.querySelector('.cards');

wrapper.innerHTML = places.map(function (place) {
	return `<div class="card">
    <h2 class="title">${place.name}</h2>
    <img src="images/${place.name}1.jpg" class="align-left slide-in">
    <img src="images/${place.name}2.jpg" class="align-right slide-in">
    </div>`;
}).join('');

//Function that limits the amount of times the EventListener runs
function limiter(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(event) {
  sliderImages.forEach(sliderImage => {
    // half way through the image
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 3;

    // bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    // doing the math
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

//limiter added to the standard event listener to limit it
window.addEventListener('scroll', limiter(checkSlide))

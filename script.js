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
  console.count(event)
}

//limiter added to the standard event listener to limit it
window.addEventListener('scroll', limiter(checkSlide))

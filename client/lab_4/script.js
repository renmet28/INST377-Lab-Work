let slidePosition =0;
const slides = document.querySelectorAll('carousel_item');
const totalSlides = slides.length;

console.log(slides);

document.querySelector('carousel_button--next')
.addEventListener('click,' function() {
    moveToNextSlide();
});


document.querySelector('carousel_button--prev')
.addEventListener('click,' function() {
    moveToPrevSlide();
});

function updateSlidePosition() {
    for (let lside of slide) {
        console.log(slide);
    }
}


function moveToNextSlide() {

    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    }   else {
        slidePosition++;
    }
    updateSlidePosition();
}

function moveToPrevSlide () {
    if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
    }   else {
        slidePosition--;
    }
    updateSlidePosition();
    
}

var swiperDiv = document.getElementById("wpgswiper");
var columns = swiperDiv.getAttribute("data-columns");

var swiper = new Swiper(".wpgswiper", {
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    slidesPerView: columns,
    spaceBetween: 32,
    a11y: true,
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 32,
        },
        // when window width is >= 640px
        768: {
            slidesPerView: columns,
            spaceBetween: 32,
        },
    },
    keyboard: true,			
});
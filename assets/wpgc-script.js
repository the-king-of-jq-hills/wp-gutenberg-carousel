

var wpgcColumns = 3;
var swiperDiv = document.getElementsByClassName("wpgswiper");

if (swiperDiv.length > 0) {

    wpgcColumns = swiperDiv[0].getAttribute("data-columns");

    var swiper = new Swiper(".wpgswiper", {
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        slidesPerView: wpgcColumns,
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
                slidesPerView: wpgcColumns,
                spaceBetween: 32,
            },
        },
        keyboard: true,			
    });
    
}

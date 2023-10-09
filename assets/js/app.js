$(function () {
    if ($('#slider-hero').length) {
        new Swiper('#slider-hero .swiper', {
            speed: 500,
            slidesPerView: 1,
            preloadImages: false,
            effect: 'fade',
            loop: true,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            }, navigation: {
                nextEl: "#slider-hero .banner-button_next",
                prevEl: "#slider-hero .banner-button_prev",
            }, pagination: {
                el: "#slider-hero .banner-pagination",
                clickable: true, renderBullet: function (index, className) {
                    return `<span class="${className}">0${index + 1}</span>`;
                },
            }
        });
    }
});
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
	if ($('#slider-service').length) {
		new Swiper('#slider-service .swiper', {
			speed: 500,
			slidesPerView: 5,
			preloadImages: false,
			spaceBetween: 24,
			loop: true,
			autoplay: {
				delay: 6000,
				disableOnInteraction: false,
			},
			pagination: {
				el: "#slider-service .slider-pagination",
				clickable: true
			}
		});
	}

	if ($('#slider-partner').length) {
		new Swiper('#slider-partner .swiper', {
			speed: 500,
			slidesPerView: 6,
			preloadImages: false,
			spaceBetween: 24,
			loop: true,
			autoplay: {
				delay: 6000,
				disableOnInteraction: false,
			},
			pagination: {
				el: "#slider-partner .slider-pagination",
				clickable: true
			}
		});
	}
});
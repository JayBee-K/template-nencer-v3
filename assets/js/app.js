var windowWidth = document.documentElement.clientWidth;
window.addEventListener("resize", () => {
	windowWidth = document.documentElement.clientWidth;
});

let handleApplyCollapse = function ($parent, $firstItem = false, $callFunction = false) {
	let $childUl = $parent.find('> li > ul');
	if ($childUl.length === 0) {
		return;
	}

	if ($callFunction) {
		$parent.find('> li a').each(function () {
			$(this).attr('data-href', $(this).attr('href'))
		});
	}

	if (windowWidth <= 991) {

		let $objParentAttr = {};
		let $objChildrenAttr = {
			'data-bs-parent': '#' + $parent.attr('id')
		}

		if ($firstItem) {
			let $parentID = 'menu-' + Math.random().toString(36).substring(7);
			$parent.attr('id', $parentID);
			$objParentAttr = {
				'data-bs-parent': '#' + $parentID
			}

			$objChildrenAttr = {};
		}

		$childUl.each(function () {
			let $parentUl = $(this).closest('ul');
			let $parentListItem = $(this).closest('li');
			let $parentListItemAnchor = $parentListItem.children('a');

			let $parentUlID = 'menu-' + Math.random().toString(36).substring(7);

			$parentUl.addClass('collapse').attr({
				'id': 'collapse-' + $parentUlID, ...$objParentAttr, ...$objChildrenAttr
			});

			$parentListItemAnchor.replaceWith(function () {
				return `<button aria-label="${$parentListItemAnchor.attr('aria-label')}" data-href="${$parentListItemAnchor.attr('data-href')}" data-bs-toggle="collapse" data-bs-target="#${$parentUl.attr('id')}">${$parentListItemAnchor.html()}</button>`
			})

			handleApplyCollapse($parentUl, false);

			$parentUl.on('show.bs.collapse', function () {
				$parent.find('.collapse.show').not($parentUl).collapse('hide');
			});
		});
	} else {
		$parent.removeAttr('id');

		$childUl.each(function () {
			let $parentUl = $(this).closest('ul');
			let $parentListItem = $(this).closest('li');

			$parentUl.removeClass('collapse').removeAttr('data-bs-parent id');
			$parentListItem.children('a').attr('href', $parentListItem.children('a').attr('data-href'));

			$parentListItem.children('button').replaceWith(function () {
				return `<a aria-label="${$(this).attr('aria-label')}" href="${$(this).attr('data-href')}" data-href="${$(this).attr('data-href')}">${$(this).html()}</a>`
			})

			handleApplyCollapse($parentUl);
		});
	}
}

let handleCallMenu = function () {
	const $body = $('body');
	const handleBody = function ($toggle = false) {
		if ($body.hasClass('is-navigation')) {
			$body.removeClass('is-navigation');
			if ($body.hasClass('is-overflow')) {
				$body.removeClass('is-overflow');
			}

			$('#header-navigation ul').collapse('hide');
		} else {
			if ($toggle) {
				$body.addClass('is-navigation is-overflow')
			}
		}
	}

	if (windowWidth <= 991) {
		const $hamburger = $('#hamburger-button');
		if ($hamburger.length) {
			$hamburger.click(function () {
				handleBody(true)
			});
		}

		const $overlay = $('#header-overlay');
		if ($overlay.length) {
			$overlay.click(function () {
				handleBody();
			});
		}
	} else {
		handleBody();
	}
}

const handleStickHeader = function () {
	$(window).scroll(function (e) {
		if ($(document).scrollTop() > $('#header').innerHeight()) {
			$('#header').addClass('is-scroll');
		} else {
			$('#header').removeClass('is-scroll');
		}
	});
}

const handleCopyValue = function () {
	const copyButtons = document.querySelectorAll('.button-copy');
	if (copyButtons) {
		copyButtons.forEach(function (copyButton) {
			copyButton.addEventListener('click', function () {
				const valueToCopy = copyButton.getAttribute('data-value');

				const tempTextArea = document.createElement('textarea');
				tempTextArea.style.cssText = 'position: absolute; left: -99999px';
				tempTextArea.setAttribute("id", "textareaCopy");
				document.body.appendChild(tempTextArea);

				let textareaElm = document.getElementById('textareaCopy');
				textareaElm.value = valueToCopy;
				textareaElm.select();
				textareaElm.setSelectionRange(0, 99999);
				document.execCommand('copy');

				document.body.removeChild(textareaElm);

				if (copyButton.getAttribute('data-bs-toggle') === 'tooltip') {
					copyButton.setAttribute('title', 'Đã sao chép');

					const tooltip = bootstrap.Tooltip.getInstance(copyButton);
					tooltip.setContent({'.tooltip-inner': 'Đã sao chép'})
				}
			});
		})
	}
}

$(function () {
	handleApplyCollapse($('#header-navigation > ul'), true, true);
	handleCallMenu();
	$(window).resize(function () {
		handleApplyCollapse($('#header-navigation > ul'));
		handleCallMenu();
	})

	handleStickHeader();

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
			},
			navigation: {
				nextEl: "#slider-hero .banner-button_next",
				prevEl: "#slider-hero .banner-button_prev",
			}, pagination: {
				el: "#slider-hero .banner-pagination",
				clickable: true,
				renderBullet: function (index, className) {
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
			},
			breakpoints: {
				320: {

					slidesPerView: 1,
				}, 375: {

					slidesPerView: 2,
				}, 768: {

					slidesPerView: 3.5,
				}, 991: {

					slidesPerView: 4.5,
				}, 1200: {

					slidesPerView: 5,
				}
			},
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
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				375: {
					slidesPerView: 2.5,
				},
				768: {
					slidesPerView: 3.5,
				},
				991: {
					slidesPerView: 4.5,
				},
				1200: {
					slidesPerView: 5,
				}
			},
		});
	}

	if ($('#slider-procedure').length) {
		new Swiper('#slider-procedure .swiper', {
			speed: 500,
			slidesPerView: 4,
			preloadImages: false,
			spaceBetween: 0,
			breakpoints: {
				320: {
					slidesPerView: 1,
				}, 375: {
					slidesPerView: 2,
				}, 768: {
					slidesPerView: 3.5,
				}, 991: {
					slidesPerView: 4.5,
				}, 1200: {
					slidesPerView: 4,
				}
			},
		});
	}

	if ($('#article-content table').length > 0) {
		$('#article-content table').map(function () {
			$(this).addClass('table table-bordered');
			$(this).wrap('<div class="table-responsive"></div>');
		})
	}

	handleCopyValue();
	if ($('[data-bs-toggle="tooltip"]').length) {
		$('[data-bs-toggle="tooltip"]').tooltip();
	}
});

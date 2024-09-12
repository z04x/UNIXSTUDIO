/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }


import Swiper from 'swiper';
import { Autoplay, Scrollbar, Navigation, EffectCoverflow, EffectFlip } from 'swiper/modules';
/*

Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
//import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
//import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.swiper')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.swiper', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Scrollbar],
			observer: true,
			observeParents: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар

			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,

			},


			// Кнопки "вліво/вправо"


			// Брейкпоінти
			breakpoints: {
				100: {
					spaceBetween: 20,
				},
				320: {
					slidesPerView: 1,
					spaceBetween: 20,
				},

				1268: {
					slidesPerView: 2.2,
					spaceBetween: 40,
				},
			},

			// Події
			on: {

			}
		});
	}
	if (document.querySelector('.s1')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.s1', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Autoplay, EffectFlip],
			observer: true,
			observeParents: true,
			speed: 800,
			slidesPerView: 1,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,


			// Ефекти

			// autoplay: {
			// 	delay: 2000,
			// 	pauseOnMouseEnter: true,
			// 	disableOnInteraction: false,
			// },


			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар



			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.swiper-button-prev01',
				nextEl: '.swiper-button-next01',
			},

			// Брейкпоінти
			// breakpoints: {
			// 	100: {
			// 		spaceBetween: 20,
			// 	},
			// 	320: {
			// 		slidesPerView: 1,
			// 		spaceBetween: 20,
			// 	},

			// 	1268: {
			// 		slidesPerView: 2.2,
			// 		spaceBetween: 40,
			// 	},
			// },

			// Події
			on: {

			}
		});
	}
	if (document.querySelector('.swiper-reviews')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.swiper-reviews', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Autoplay, EffectFlip],
			observer: true,
			observeParents: true,
			speed: 900,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,


			// Ефекти

			autoplay: {
				delay: 2000,
				pauseOnMouseEnter: true,
				disableOnInteraction: false,
			},


			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар



			// Кнопки "вліво/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev01',
			// 	nextEl: '.swiper-button-next01',
			// },

			// Брейкпоінти
			breakpoints: {
				100: {
					spaceBetween: 20,
				},
				320: {
					slidesPerView: 1,
					spaceBetween: 20,
				},

				1268: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
			},

			// Події
			on: {

			}
		});
	}
	if (document.querySelector('.swiper-dribble')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.swiper-dribble', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Autoplay, EffectFlip],
			observer: true,
			observeParents: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,


			// Ефекти

			autoplay: {
				delay: 2000,
				pauseOnMouseEnter: true,
				disableOnInteraction: false,
			},


			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар



			// Кнопки "вліво/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev01',
			// 	nextEl: '.swiper-button-next01',
			// },

			// Брейкпоінти
			breakpoints: {
				100: {
					spaceBetween: 20,
				},
				320: {
					slidesPerView: 1,
					spaceBetween: 20,
				},

				1268: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
			},

			// Події
			on: {

			}
		});
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});
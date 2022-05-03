//  Ivan Eremeev - 2020
//  Telegram: IvanMessage
//  Email: ivan.frontcoder@gmail.com

$(document).ready(function () {

	// Запрет перехода по ссылкам с хэшем
	$('a[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// Swiper
	const sliderHome = new Swiper('#sliderHome', {
		spaceBetween: 20,
		loop: true,
		autoplay: true,
		pagination: {
			el: '.slider__pagination',
			clickable: true,
		},
		on: {
			init() {
				this.el.addEventListener('mouseenter', () => {
					this.autoplay.stop();
				});

				this.el.addEventListener('mouseleave', () => {
					this.autoplay.start();
				});
			}
		},

	});

	const sliderProductPage = new Swiper('#sliderProductPage', {
		spaceBetween: 20,
		pagination: {
			el: '.product__pagination',
			clickable: true,
		},
		navigation: {
			prevEl: '.product__arrow--prev',
			nextEl: '.product__arrow--next',
		},
	});

	// // Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
	// function stikyMenu() {
	// 	const header = document.querySelector('#header');
	// 	const content = document.querySelector('.content');
	// 	let width = window.clientWidth;

	// 	if (header) {
	// 		setPaddingTopFromHeader();

	// 		setNavbarPosition();

	// 		window.addEventListener('scroll', () => {
	// 			setNavbarPosition();
	// 		});
	// 	}

	// 	// window.addEventListener('resize', (e) => {
	// 	// 	if (e.target.innerWidth !== width) {
	// 	// 		width = e.target.innerWidth;
	// 	// 		setPaddingTopFromHeader();
	// 	// 	}
	// 	// })

	// 	function setNavbarPosition() {

	// 		if (window.scrollY > header.clientTop + 300) {
	// 			header.classList.add('stiky');
	// 		} else if (window.scrollY <= header.clientTop + 1) {
	// 			header.classList.remove('stiky');
	// 		}

	// 	}

	// 	function setPaddingTopFromHeader() {
	// 		setTimeout(() => {
	// 			content.setAttribute('style', `padding-top:${header.clientHeight
	// 				}px;`);
	// 		}, 500);
	// 	}

	// }
	// stikyMenu();

	// Изменение количества товара (плюс минус)
	function counter(block) {
		const counter = document.querySelector(block);
		if (counter) {
			const minus = counter.querySelector('.counter-minus');
			const plus = counter.querySelector('.counter-plus');
			const inputWrap = counter.querySelector('.counter-input');
			const input = inputWrap.querySelector('input');
			plus.addEventListener('click', () => {
				if (Number(input.value) < 999) {
					input.value = Number(input.value) + 1;
				}
			})
			minus.addEventListener('click', () => {
				if (Number(input.value) > 1) {
					input.value = Number(input.value) - 1;
				}
			})
			input.addEventListener('blur', () => {
				if (input.value == '' || input.value == 0) {
					input.value = 1;
				}
			})
		}
	}
	counter('#counter');

	// Выпадайка по состоянию input (checked)
	function showDropInputChecked(input) {
		var $this = undefined,
			drop = undefined,
			close = $('.js-drop-input-close');
		input.on('change', function () {
			$this = $(this);
			drop = $('#' + $this.data('drop'));
			if ($this.prop('checked')) {
				$this.addClass('active');
				drop.addClass('open');
			} else {
				$this.removeClass('active');
				drop.removeClass('open');
			}
			$(document).mouseup(function (e) {
				if (!$this.is(e.target)
					&& $this.has(e.target).length === 0
					&& !drop.is(e.target)
					&& drop.has(e.target).length === 0) {
					$this.removeClass('active');
					drop.removeClass('open');
				}
			});
		})
		close.on('click', function () {
			$('[data-drop="' + $(this).data('drop') + '"]').removeClass('active');
			$('#' + $(this).data('drop')).removeClass('open');
		})
	}
	showDropInputChecked($('.js-drop-input'));

	// Табы на радиокнопках
	function tabsRadio(tabs) {
		if (tabs.length) {
			tabs.each(function () {
				let triggers = tabs.find('.js-tabs-radio_triggers input');
				let tabsBlocks = tabs.find('.js-tabs-radio_tab');
				triggers.on('change', function () {
					let trigger = $(this);
					let tab = $('[data-tab="' + trigger.data('trigger') + '"]');
					tabsBlocks.stop().fadeOut(0).removeClass('open');
					tab.stop().fadeIn(300).addClass('open');
				});
			});
		}
	}
	tabsRadio($('.js-tabs-radio'));

	// airDatepicker | Календарь
	let minDate = new Date();
	new AirDatepicker('#airDatepicker', {
		navTitles: {
			days: 'MMMM yyyy'
		},
		minDate,
		onSelect({ date, formattedDate, datepicker }) {
			datepicker.hide();
		}
	})

	$('select').styler();

	// Выпадайки при клике по кнопке
	// Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
	// Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
	function dropBlock(btn) {
		var $this = undefined,
			drop = undefined,
			close = $('.js-drop-close');
		btn.on('click', function () {
			$this = $(this);
			drop = $('#' + $this.data('drop'));
			$this.toggleClass('is-active');
			drop.toggleClass('open');
			$(document).mouseup(function (e) {
				if (!$this.is(e.target)
					&& $this.has(e.target).length === 0
					&& !drop.is(e.target)
					&& drop.has(e.target).length === 0) {
					$this.removeClass('is-active');
					drop.removeClass('open');
				}
			});
		})
		close.on('click', function () {
			$('[data-drop="' + $(this).data('drop') + '"]').removeClass('is-active');
			$('#' + $(this).data('drop')).removeClass('open');
		})
	}
	dropBlock($('.js-drop-btn'));

	// Имитатор placeholder в input search
	function placeholderSearch() {
		const input = $('#search');
		const placeholder = $('.header__search-placeholder');
		console.log(input);
		input.on('input', function () {
			if (!input.val() == '') {
				placeholder.addClass('hide');
			} else {
				placeholder.removeClass('hide');
			}
		})
	}
	placeholderSearch();

});
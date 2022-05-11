//  Ivan Eremeev - 2022
//  Telegram: IvanMessage
//  Email: ivan.frontcoder@gmail.com

$(document).ready(function () {

	// Swiper
	const sliderProductPage = new Swiper('#sliderProductPage', {
		spaceBetween: 10,
		pagination: {
			el: '.product__pagination',
			clickable: true,
		},
	});

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
		isMobile: true,
		autoClose: true,
		navTitles: {
			days: 'MMMM yyyy'
		},
		minDate,
	})

	// Formstyler Select
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
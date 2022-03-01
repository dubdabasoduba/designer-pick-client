/*
 * Copyright (c) 2022. The content in this file is Protected by the copyright laws of kenya and owned by Logo247 Designs.
 * Reproducing it in any way or using it without permission from Logo Bidding System will be a violation of kenyan copyrights law.
 * This may be subject to prosecution according to the kenyan law
 */

$(function () {
	'use script'
	
	$('[data-toggle="tooltip"]').tooltip()
	
	window.darkMode = function () {
		$('.btn-white').addClass('btn-dark').removeClass('btn-white');
		$('.bg-white').addClass('bg-gray-900').removeClass('bg-white');
		$('.bg-gray-50').addClass('bg-dark').removeClass('bg-gray-50');
	}
	
	window.lightMode = function () {
		$('.btn-dark').addClass('btn-white').removeClass('btn-dark');
		$('.bg-gray-900').addClass('bg-white').removeClass('bg-gray-900');
		$('.bg-dark').addClass('bg-gray-50').removeClass('bg-dark');
	}
	
	let hasMode = Cookies.get('df-mode');
	if (hasMode === 'dark') {
		darkMode();
	} else {
		lightMode();
	}
	
	$('#updateUserDatepicker').datepicker();
});

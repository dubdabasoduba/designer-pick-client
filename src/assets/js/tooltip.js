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

    var hasMode = Cookies.get('df-mode');
    if (hasMode === 'dark') {
        darkMode();
    } else {
        lightMode();
    }
});
$('#updateUserDatepicker').datepicker();

$(document).ready(function() {

    $('.element-card').on('click', function() {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).addClass('col-5');
            $(this).removeClass('col-12');
        } else {
            $('.element-card').removeClass('col-12');
            $('.element-card').addClass('col-5');
            $('.element-card').removeClass('open');
            $(this).addClass('open');
            $(this).removeClass('col-5');
            $(this).addClass('col-12');
        }

    });

});

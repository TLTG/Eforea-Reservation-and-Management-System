$(document).ready(function() {
    $('.query').css('display', 'none');

    $('.dash-btn').on('click', function(){
        if(!$('.dash-btn').hasClass('active')){
            $('.dash-btn').addClass('active');
            $('.dashboard').css('display','block');
            $('.query').css('display', 'none');
        }
    });
    $('.que-btn').on('click', function(){
        if(!$('.que-btn').hasClass('active')){
            $('.que-btn').addClass('active');
            $('.query').css('display','block');
            $('.dashboard').css('display', 'none');
        }
    });
});
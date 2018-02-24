$(document).ready(function () {
    $('.carousel').carousel();

    window.onscroll = function () {
        myFunction()
    };

    var header = document.getElementById("stickyServ");
    var sticky = header.offsetTop;

    function myFunction() {
        if (window.pageYOffset >= sticky) {
            header.classList.add("sticky");
        }
        else {
            header.classList.remove("sticky");
        }
    }
});
// Massage Services
function addCartModal(data){
    var id = data.id;
    var serviceName = data.name;
    var price = data.todo;
    $('#serviceHolder').html(serviceName);
    $('#priceHolder').html(price); 
}

function viewInfo(data){
    $('.info-desc').html(data.desc);
    $('.info-price').html(data.price);
    $('.info-time').html(data.time);
    $('.info-label').html(data.name);
}
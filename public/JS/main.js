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

var order = [];

// Massage Services
function addCartModal(data) {
    var id = data.id;
    var serviceName = data.name;
    var price = data.todo;
    $('#serviceHolder').html(serviceName);
    $('#serviceHolder').val(serviceName);
    $('#priceHolder').html(price);
    $('#priceHolder').val(price);
    $('#item_id').val(id);
}

function viewInfo(data) {
    $('.info-desc').html(data.desc);
    $('.info-price').html(data.price);
    $('.info-time').html(data.time);
    $('.info-label').html(data.name);
}

function addToCart() {
    var _name = $('#serviceHolder').val();
    var _price = $('#priceHolder').val();
    var _quantity = $('#itemnum').val();
    var _id = $('#item_id').val();
    //$.post('/reserve', { action: 'addToCart', id: _id, num: _quantity}, function(data){
        var newOrder = "<div class='row ordername'><div class='col-md-8'><span class='badge'>" + _quantity + "</span>" + _name + "</div><div class='col-md-4'>P" + _price + ".00<a href='#'<span class='glyphicon glyphicon-remove' title='Remove' aria-hidden='true'></span></a></div></div>"       
        $('.order-container').append(newOrder);
        order.push({
            id: _id,
            name: _name,
            price: _price,
            quant: _quantity
        });
    //});
}

function viewOrderModal(){
    var orders = "<table width='100%'><tr><th class='th-modal' width='15%'> Quantity </th><th class='th-modal' width='50%'> Service </th><th class='th-modal' width='20%'> Amount </th><th class='th-modal' width='30%'> Total Amount </th></tr>";
    var total = 0;
    order.forEach(element => {
        var temp = "<tr>";
        temp += "<td>" + element.quant + "</td>";
        temp += "<td>" + element.name + "</td>";
        temp += "<td>P" + element.price + ".00</td>";
        var totVal = element.price * element.quant;
        temp += "<td>P" + totVal + ".00</td>";
        temp += "</tr>";
        total += totVal;
        orders += temp;
    });
    orders += "</table>";
    orders += "<p style='text-align: right; font-size: 17px;'><strong>Total:</strong><span style='font-size: 15px;' class='badge'>Php "+ total +".00</span></p>";
    $('.viewOrderMod').html(orders);
}
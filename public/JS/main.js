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

    if (document.cookie.cart != undefined) {
        var cart = JSON.parse(document.cookie.cart);
        userData.cart = cart;
    } else {

    }

    getContent();
    setInitCart();
});

function getContent() {
    $.get('/reserve/data', function (data) {
        if (data === undefined) {
            alert('Server Connection Timeout, Try again later');
            console.error('Server response error');
            return;
        }
        serv = data.services;
        var html = "";
        data.categories.forEach(service => {
            html += " <li class='li-navlist'><a href='#' onclick='hideMenuExcept(" + service.id + ")'><span class='badge'>" + service.count + "</span>  " + service.name + "</a></li>";
        });
        html += "<li class='li-navlist'><a href='#' onclick='hideMenuExcept(-1)'>View All </a></li>";
        $('.category-list').html(html);

        html = "";
        //console.log(JSON.stringify(data.categories));
        data.categories.forEach(element => {
            //console.log(element.name);
            html = "<form method='post' class='menu menu-" + element.id + "'><h3 class='alert alert-info'>" + element.name + "</h3><br/>";
            var a = 1;
            data.services.forEach(elem => {
                //console.log(elem.name);
                if (elem.category == element.id) {
                    if (elem.type == 0) {
                        html += "<div style='padding-left: 30px;'><p class='p-head'><b>" + a + ".</b>" + elem.name + "<a title='Information' onclick='viewInfo({\"name\":\"" + elem.name + "\", \"desc\":\"" + elem.desc + "\", \"price\":\"" + elem.amount + "\", \"time\":\"" + elem.time + "\"})' name='btnInfo' data-toggle='modal' data-target='#infoServiceModal'><span class='glyphicon glyphicon-info-sign' style='float: right;' aria-hidden='true'></span><span class='sr-only'>View Information</span></a></p><hr><div class='p-price'><label> Price: Php" + elem.amount + "</label><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + elem.amount + "\" })' class='btn btn-primary btn-addCart btn-" + elem.id + "' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div></div><br /><br /><hr class='hr-sepserv'>";
                    } else if (elem.type == 1) {
                        var price = elem.amount.split('/');
                        html += "<div class='row' style='padding-left: 50px;'><p class='p-head'><b>" + a + ".</b>" + elem.name + "<a title='Information' onclick='viewInfo({\"name\":\"" + elem.name + "\", \"desc\":\"" + elem.desc + "\", \"price\":\"" + elem.amount + "\", \"time\":\"" + elem.time + "\"})' name='btnInfo' data-toggle='modal' data-target='#infoServiceModal'><span class='glyphicon glyphicon-info-sign' style='float: right;' aria-hidden='true'></span><span class='sr-only'>View Information</span></a></p>";
                        html += "<div class='col-md-4'><label> Hand Spa </label><br /><label> Price: Php " + price[0] + ".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[0] + "\", \"type\": \"0\" })' class='btn btn-primary btn-addCart btn-" + elem.id + "' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "<div class='col-md-4'><label> Feet Spa </label><br /><label> Price: Php " + price[1] + ".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[1] + "\", \"type\": \"1\" })' class='btn btn-primary btn-addCart btn-" + elem.id + "' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "<div class='col-md-4'><label> Hand and Feet Spa </label><br /><label> Price: Php " + price[2] + ".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[2] + "\", \"type\": \"2\" })' class='btn btn-primary btn-addCart btn-" + elem.id + "' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "</div><br /><hr class='hr-sepserv'>";
                    } else if (elem.type == 2) {
                        var price = elem.amount.split('/');
                        html += "<div class='row' style='padding-left: 50px;'><p class='p-head'><b>" + a + ".</b>" + elem.name + "<a title='Information' onclick='viewInfo({\"name\":\"" + elem.name + "\", \"desc\":\"" + elem.desc + "\", \"price\":\"" + elem.amount + "\", \"time\":\"" + elem.time + "\"})' name='btnInfo' data-toggle='modal' data-target='#infoServiceModal'><span class='glyphicon glyphicon-info-sign' style='float: right;' aria-hidden='true'></span><span class='sr-only'>View Information</span></a></p>";
                        html += "<div class='col-md-3'><label> Hand Spa </label><br /><label> Price: Php " + price[0] + ".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[0] + "\", \"type\": \"0\" })' class='btn btn-primary btn-addCart btn-" + elem.id + "' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "<div class='col-md-3'><label> Hand Spa with <br />Manicure</label><br /><label> Price: Php " + price[1] + ".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[1] + "\", \"type\": \"1\" })' class='btn btn-primary btn-addCart btn-" + elem.id + "' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "<div class='col-md-3'><label> Feet Spa </label><br /><label> Price: Php " + price[2] + ".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[2] + "\", \"type\": \"2\" })' class='btn btn-primary btn-addCart btn-" + elem.id + "' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "<div class='col-md-3'><label> Feet Spa with <br />Pedicure </label><br /><label> Price: Php " + price[3] + ".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[3] + "\", \"type\": \"2\" })' class='btn btn-primary btn-addCart btn-" + elem.id + "' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "</div><br /><hr class='hr-sepserv'>";
                    } else if (elem.type == 3) {
                        var price = elem.amount.split('/');
                        html += "<div style='padding-left: 30px;'><p class='p-head'><b>" + a + ".</b>" + elem.name + "<a title='Information' onclick='viewInfo({\"name\":\"" + elem.name + "\", \"desc\":\"" + elem.desc + "\", \"price\":\"" + elem.amount + "\", \"time\":\"" + elem.time + "\"})' name='btnInfo' data-toggle='modal' data-target='#infoServiceModal'><span class='glyphicon glyphicon-info-sign' style='float: right;' aria-hidden='true'></span><span class='sr-only'>View Information</span></a></p>";
                        html += "<center id='item-" + elem.id + "'><label class='control control--radio radio-hw'>Male<br>Price: Php " + price[0] + ".00<input type='radio' name='radiohw1' value='" + price[0] + "' checked/><div class='control__indicator'></div></label> &emsp;&emsp;";
                        html += "<label class='control control--radio radio-hw'>Female<br>Price: Php " + price[1] + ".00<input type='radio' name='radiohw1' value='" + price[1] + "'><div class='control__indicator'></div></label><hr /><div clas='p-price'><button type='button' id='mslink' onclick='addCartModal1({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\"})' class='btn btn-primary btn-addCart btn-" + elem.id + "' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div></center>";
                        html += "</div><br /><hr class='hr-sepserv'>";
                    } else {
                        var price = elem.amount.split('/');
                        html += "<div style='padding-left: 30px;'><p class='p-head'><b>" + a + ".</b>" + elem.name + "<a title='Information' onclick='viewInfo({\"name\":\"" + elem.name + "\", \"desc\":\"" + elem.desc + "\", \"price\":\"" + elem.amount + "\", \"time\":\"" + elem.time + "\"})' name='btnInfo' data-toggle='modal' data-target='#infoServiceModal'><span class='glyphicon glyphicon-info-sign' style='float: right;' aria-hidden='true'></span><span class='sr-only'>View Information</span></a></p>";
                        html += "<center id='item-" + elem.id + "'><label class='control control--radio radio-hw'>Per session<br>Price: Php " + price[0] + ".00<input type='radio' name='radiohw1' value='" + price[0] + "' checked/><div class='control__indicator'></div></label> &emsp;&emsp;";
                        html += "<label class='control control--radio radio-hw'>Per 5 session<br>Price: Php " + price[1] + ".00<input type='radio' name='radiohw1' value='" + price[1] + "'><div class='control__indicator'></div></label> &emsp;&emsp;";
                        html += "<label class='control control--radio radio-hw'>Per 10 session<br>Price: Php " + price[2] + ".00<input type='radio' name='radiohw1' value='" + price[2] + "'><div class='control__indicator'></div></label><hr /><div clas='p-price'><button type='button' id='mslink' onclick='addCartModal1({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\"})' class='btn btn-primary btn-addCart btn-" + elem.id + "' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div></center>";
                        html += "</div><br /><hr class='hr-sepserv'>";
                    }
                    a++;
                }
            });
            html += "</form>";
            $('.service-list').append(html);
        });
    });
}

var order = [];
var serv = [];
var userData = {
    name: '',
    number: '',
    address: '',
    data: '',
    cart: []
};

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

function setInitCart(){
    var cookies = decodeURIComponent(document.cookie).split(';');
    cookies.forEach(element => {
        var item = element.split('=');
        if(item[0] === ' cart'){
            order = JSON.parse(item[1]);
            updateCart();
            var tot = 0;
            order.forEach(a => {
                tot += parseInt(a.price) * parseInt(a.quant);
                displayOrder(a.id,a.quant,a.name,a.price,tot);
            });
            $('.totalParag').html(tot);              
        }
    });
}

function addToCart() {
    var _name = $('#serviceHolder').val();
    var _price = $('#priceHolder').val();
    var _quantity = $('#itemnum').val();
    var _id = $('#item_id').val();
    if (order.length < 5) {
        var flag = true, _total = 0, _totalQuan = 0;
        order.forEach(element => {
            _total += parseInt(element.price);
            _totalQuan += parseInt(element.quant);
            if (element.id == _id) {
                flag = false;
            }
        });
        if(_totalQuan + parseInt(_quantity) > 5){
            alert("Maximum of 5 entry exceeded!");
            return;            
        }
        if(flag) {
            displayOrder(_id,_quantity,_name,_price,_total);          
            order.push({
                id: _id,
                name: _name,
                price: _price,
                quant: _quantity
            });
            document.cookie = "cart=" + JSON.stringify(order) + ";";
        }else {
            alert("Same entry is already reserved!");
        }
    } else {
        alert("Reservation limit is reached! (5 services)");
    }
    updateCart();
}

function removeToCart(param) {
    $('#myModal').modal('show');
    $('.id_' + param).remove();
    var x = 0, a = -1, _total = 0;
    order.forEach(element => {
        _total += parseInt(element.price) * parseInt(element.quant);
        if (element.id == param) {
            a = x;
            _total -= parseInt(element.price) * parseInt(element.quant);
        } else {
            x++;
        }
    });
    if (a != -1) {
        order.splice(a, 1);
        $('.totalParag').html(_total);
        document.cookie = "cart=" + JSON.stringify(order) + ";";
    }
    updateCart();
}

function updateCart(){
    if(order.length == 0){
        var noOrder = "<div class='row ordername_empty'><center><p style='padding-top: 60px'>No services selected.</p></center></div>"
        $('.order-container').html(noOrder);
        $('.submit').attr("disabled", "disabled");
    }else{
        $('.ordername_empty').remove();
        $('.submit').removeAttr("disabled");
    }
}

function displayOrder(_id,_quantity,_name,_price,_total){
    var newOrder = "<div class='row ordername id_" + _id + "'><div class='col-md-8'><span class='badge'>" + _quantity + "</span>" + _name + "</div><div class='col-md-4'>P" + _price + ".00<a href='#' onclick='removeToCart(\"" + _id + "\")'><span class='glyphicon glyphicon-remove' title='Remove' aria-hidden='true'></span></a></div></div>"
    $('.order-container').append(newOrder);
    $('.totalParag').html(_total + parseInt(_price * _quantity));  
}

function addCartModal1(data) {
    var id = data.id;
    var serviceName = data.name;
    var price = $("#item-" + id + " input[name='radiohw1']:checked").val();
    $('#serviceHolder').html(serviceName);
    $('#serviceHolder').val(serviceName);
    $('#priceHolder').html(price);
    $('#priceHolder').val(price);
    $('#item_id').val(id);
}

function viewOrderModal() {
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
    if (total == 0) {
        orders += "<center><h3>Nothing Selected</h3></center>";
    }
    orders += "<br><br><p style='text-align: right; font-size: 17px;'><strong>Total: </strong><span style='font-size: 15px;' class='badge'> &#8369; " + total + ".00</span></p>";
    $('.viewOrderMod').html(orders);
}

function validateInfo() {
    var _userdata = $('#userData').serializeArray();
    userData.name = _userdata[0].value;
    userData.number = _userdata[1].value;
    userData.address = _userdata[2].value;
    userData.data = _userdata[3].value;
    userData.cart = order;

    document.cookie = "userInfo:" + userData;
    //Some validation here. then add condition sa baba.

    //Seryoso need ng validation before mag proceed.
    $('#getUserData').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#doneOrderModal').modal('toggle');
}
//This submits the reservation(var order[]) to the server for processing.
function submitReservation() {
    $.post('/reserve', { action: 'reserve', data: JSON.stringify(userData) }, function (returndata) {
        if (returndata) {
            alert('Successfully Reserve!');
            window.location = "/";
        } else {
            alert("Can't process you request. Try again later.");
            window.location = "/reserve";
        }
    });
}
//This hides categories except on the parameter.
function hideMenuExcept(param) {
    var apply = function (){
        $('.menu-show').css("display", "inline");
        $('.menu').css("display", "none");
    }
    if (param != -1) {
        $('.menu-show').addClass('menu');
        $('.menu-show').removeClass('menu-show');
        $('.menu-' + param).removeClass('menu');
        $('.menu-' + param).addClass('menu-show');
        apply();
    }else {
        $('.menu').css("display", "inline");
    }
    $('.no_result').css('display', 'none');    
    if(param == -2){
        $('.menu-show').addClass('menu');
        $('.menu-show').removeClass('menu-show');
        $('.no_result').css('display', 'inline');
        apply();
    }
}
//Search
function searchService() {
    var look = $('#search-bar').val();
    var done = false;
    serv.forEach(element => {
        if (look.toLowerCase() == element.name.toLowerCase()) {
            hideMenuExcept(element.category);
            done = true;
        }
    });
    if(!done){
        hideMenuExcept(-2);
    }
}
$(document).ready(function () {
    $("#step-1").show();
    $("#step-2").hide();
    $("#step-3").hide();

    $('input.timepicker').timepicker({ 
        timeFormat: 'h:mm:ss p',
        minTime: '11:45:00', // 11:45:00 AM,
        maxHour: 20,
        maxMinutes: 30,
        startTime: new Date(0,0,0,15,0,0), // 3:00:00 PM - noon
        interval: 15 // 15 minutes
    });

    $('.carousel').carousel();

    window.onscroll = function () {
        myFunction()
    };

    $("#next1").click(function()
    {
        if (document.getElementById("servtype1").checked == true)
        {
            $("#step-1").hide();
            $("#step-3").hide();
            $("#step-2").show();
            document.getElementById("servicediv").innerHTML = "Home Service";
            $("#divaddress").show();
            $("#divcontnum").show();
        }
        else if (document.getElementById("servtype2").checked == true)
        {
            $("#step-1").hide();
            $("#step-3").hide();
            $("#step-2").show();
            document.getElementById("servicediv").innerHTML = "Regular Service";
            $("#divaddress").hide();
            $("#divcontnum").hide();
        }
        else
        {
            alert ('Please select a type of service reservation.')
        }
    });

    $("#next2").click(function()
    {
        var salut = null;
        var fn = document.getElementById("first-name").value;
        var ln = document.getElementById("last-name").value;
        var add = document.getElementById("address").value;
        var cont = document.getElementById("contnum").value;

        if (document.getElementById("gender1").checked == true)
        {
            salut = "Mr. ";
        }
        else
        {
            salut = "Ms/Mrs. ";
        }

        if (document.getElementById("servtype1").checked == true)
        {
            if (fn == "" || fn.length == 0 || fn == null
            || ln == "" || ln.length == 0 || ln == null
            || add == "" || add.length == 0 || add == null
            || cont == "" || cont.length == 0 || cont == null)
            {
                alert ('Please fill in all fields.');
            }
            else
            {
                document.getElementById("custName").innerHTML = salut + " " + fn + " " + ln;
                document.getElementById("custAddress").innerHTML = add;
                $("#step-1").hide();
                $("#step-2").hide();
                $("#step-3").show(); 
            }
        }
        else
        {
            if (fn == "" || fn.length == 0 || fn == null
            || ln == "" || ln.length == 0 || ln == null)
            {
                alert ('Please fill in all fields.');
            }
            else
            {
                document.getElementById("custName").innerHTML = fn + " " + ln;
                document.getElementById("custAddress").innerHTML = add;
                $("#step-1").hide();
                $("#step-2").hide();
                $("#step-3").show(); 
            }
        }
    });

    $("#finish").click(function()
    {
        if (document.getElementById("agree").checked == true)
        {
            alert ('OKI. RESERVED KA NA KUNWARI. MODAL LANGS. WALA PA FUNCTION.')

        }
        else
        {
            alert ('BEH AGREE KA MUNA. MAY CHECKBOX DYAN. WAG NAGMAMADALI.')
        }
    });

    $("#prev1").click(function()
    {
        $("#step-1").show();
        $("#step-3").hide();
        $("#step-2").hide();
    });

    $("#prev2").click(function()
    {
        $("#step-2").show();
        $("#step-1").hide();
        $("#step-3").hide();
    });

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

    if(document.cookie.cart != undefined){
        var cart = JSON.parse(document.cookie.cart);
        userData.cart = cart;
    }else{

    }
    getContent();
});
    
function getContent(){
    var noOrder = "<div class='row ordername'><center><p style='padding-top: 60px'>No services selected.</p></center></div>"       
                $('.order-container').append(noOrder);

    $.get('/reserve/data', function(data){
        if(data === undefined){
            alert('Server Connection Timeout, Try again later');
            console.error('Server response error');
            return; 
        } 
        serv = data.services;
        var html = "";
        data.categories.forEach(service => {
            html += " <li class='li-navlist'><a href='#' onclick='hideMenuExcept("+ service.id +")'><span class='badge'>" + service.count + "</span>  " + service.name + "</a></li>";
        });
        html += "<li class='li-navlist'><a href='#' onclick='hideMenuExcept(-1)'>View All </a></li>";
        $('.category-list').html(html);

        html = "";
        //console.log(JSON.stringify(data.categories));
        data.categories.forEach(element => {
            //console.log(element.name);
            html = "<form method='post' class='menu menu-"+ element.id +"'><h3 class='alert alert-info'>" + element.name + "</h3><br/>";
            var a=1; 
            data.services.forEach(elem => {
                //console.log(elem.name);
                if(elem.category == element.id){
                    if(elem.type == 0){
                        html += "<div style='padding-left: 30px;'><p class='p-head'><b>" + a + ".</b>" + elem.name + "<a title='Information' onclick='viewInfo({\"name\":\"" + elem.name + "\", \"desc\":\"" + elem.desc + "\", \"price\":\"" + elem.amount + "\", \"time\":\"" + elem.time + "\"})' name='btnInfo' data-toggle='modal' data-target='#infoServiceModal'><span class='glyphicon glyphicon-info-sign' style='float: right;' aria-hidden='true'></span><span class='sr-only'>View Information</span></a></p><hr><div class='p-price'><label> Price: Php" + elem.amount + "</label><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + elem.amount + "\" })' class='btn btn-primary btn-addCart btn-" + elem.id +"' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div></div><br /><br /><hr class='hr-sepserv'>";                       
                    }else if(elem.type == 1){
                        var price = elem.amount.split('/');
                        html += "<div class='row' style='padding-left: 50px;'><p class='p-head'><b>"+ a +".</b>"+ elem.name +"<a title='Information' onclick='viewInfo({\"name\":\"" + elem.name + "\", \"desc\":\"" + elem.desc + "\", \"price\":\"" + elem.amount + "\", \"time\":\"" + elem.time + "\"})' name='btnInfo' data-toggle='modal' data-target='#infoServiceModal'><span class='glyphicon glyphicon-info-sign' style='float: right;' aria-hidden='true'></span><span class='sr-only'>View Information</span></a></p>";
                        html += "<div class='col-md-4'><label> Hand Spa </label><br /><label> Price: Php "+ price[0] +".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[0] + "\", \"type\": \"0\" })' class='btn btn-primary btn-addCart btn-" + elem.id +"' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "<div class='col-md-4'><label> Feet Spa </label><br /><label> Price: Php "+ price[1] +".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[1] + "\", \"type\": \"1\" })' class='btn btn-primary btn-addCart btn-" + elem.id +"' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "<div class='col-md-4'><label> Hand and Feet Spa </label><br /><label> Price: Php "+ price[2] +".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[2] + "\", \"type\": \"2\" })' class='btn btn-primary btn-addCart btn-" + elem.id +"' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "</div><br /><hr class='hr-sepserv'>";
                    }else if(elem.type == 2){
                        var price = elem.amount.split('/');
                        html += "<div class='row' style='padding-left: 50px;'><p class='p-head'><b>"+ a +".</b>"+ elem.name +"<a title='Information' onclick='viewInfo({\"name\":\"" + elem.name + "\", \"desc\":\"" + elem.desc + "\", \"price\":\"" + elem.amount + "\", \"time\":\"" + elem.time + "\"})' name='btnInfo' data-toggle='modal' data-target='#infoServiceModal'><span class='glyphicon glyphicon-info-sign' style='float: right;' aria-hidden='true'></span><span class='sr-only'>View Information</span></a></p>";
                        html += "<div class='col-md-3'><label> Hand Spa </label><br /><label> Price: Php "+ price[0] +".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[0] + "\", \"type\": \"0\" })' class='btn btn-primary btn-addCart btn-" + elem.id +"' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "<div class='col-md-3'><label> Hand Spa with <br />Manicure</label><br /><label> Price: Php "+ price[1] +".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[1] + "\", \"type\": \"1\" })' class='btn btn-primary btn-addCart btn-" + elem.id +"' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "<div class='col-md-3'><label> Feet Spa </label><br /><label> Price: Php "+ price[2] +".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[2] + "\", \"type\": \"2\" })' class='btn btn-primary btn-addCart btn-" + elem.id +"' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "<div class='col-md-3'><label> Feet Spa with <br />Pedicure </label><br /><label> Price: Php "+ price[3] +".00 </label><br /><button type='button' id='mslink' onclick='addCartModal({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name + "\", \"todo\": \"" + price[3] + "\", \"type\": \"2\" })' class='btn btn-primary btn-addCart btn-" + elem.id +"' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div>";
                        html += "</div><br /><hr class='hr-sepserv'>";
                    }else if(elem.type == 3){
                        var price = elem.amount.split('/');
                        html += "<div style='padding-left: 30px;'><p class='p-head'><b>"+ a +".</b>"+ elem.name +"<a title='Information' onclick='viewInfo({\"name\":\"" + elem.name + "\", \"desc\":\"" + elem.desc + "\", \"price\":\"" + elem.amount + "\", \"time\":\"" + elem.time + "\"})' name='btnInfo' data-toggle='modal' data-target='#infoServiceModal'><span class='glyphicon glyphicon-info-sign' style='float: right;' aria-hidden='true'></span><span class='sr-only'>View Information</span></a></p>";
                        html += "<center id='item-"+ elem.id +"'><label class='control control--radio radio-hw'>Male<br>Price: Php "+ price[0] +".00<input type='radio' name='radiohw1' value='"+ price[0] +"' checked/><div class='control__indicator'></div></label> &emsp;&emsp;";
                        html += "<label class='control control--radio radio-hw'>Female<br>Price: Php "+ price[1] +".00<input type='radio' name='radiohw1' value='"+ price[1] +"'><div class='control__indicator'></div></label><hr /><div clas='p-price'><button type='button' id='mslink' onclick='addCartModal1({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name +"\"})' class='btn btn-primary btn-addCart btn-" + elem.id +"' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div></center>";
                        html += "</div><br /><hr class='hr-sepserv'>";
                    }else{
                        var price = elem.amount.split('/');
                        html += "<div style='padding-left: 30px;'><p class='p-head'><b>"+ a +".</b>"+ elem.name +"<a title='Information' onclick='viewInfo({\"name\":\"" + elem.name + "\", \"desc\":\"" + elem.desc + "\", \"price\":\"" + elem.amount + "\", \"time\":\"" + elem.time + "\"})' name='btnInfo' data-toggle='modal' data-target='#infoServiceModal'><span class='glyphicon glyphicon-info-sign' style='float: right;' aria-hidden='true'></span><span class='sr-only'>View Information</span></a></p>";
                        html += "<center id='item-"+ elem.id +"'><label class='control control--radio radio-hw'>Per session<br>Price: Php "+ price[0] +".00<input type='radio' name='radiohw1' value='"+ price[0] +"' checked/><div class='control__indicator'></div></label> &emsp;&emsp;";
                        html += "<label class='control control--radio radio-hw'>Per 5 session<br>Price: Php "+ price[1] +".00<input type='radio' name='radiohw1' value='"+ price[1] +"'><div class='control__indicator'></div></label> &emsp;&emsp;";
                        html += "<label class='control control--radio radio-hw'>Per 10 session<br>Price: Php "+ price[2] +".00<input type='radio' name='radiohw1' value='"+ price[2] +"'><div class='control__indicator'></div></label><hr /><div clas='p-price'><button type='button' id='mslink' onclick='addCartModal1({\"id\":\"" + elem.id + "\", \"name\":\"" + elem.name +"\"})' class='btn btn-primary btn-addCart btn-" + elem.id +"' data-toggle='modal' data-target='#addCartModal'>Add to Cart</button></div></center>";
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

function addToCart() {
    var _name = $('#serviceHolder').val();
    var _price = $('#priceHolder').val();
    var _quantity = $('#itemnum').val();
    var _id = $('#item_id').val();
    //$.post('/reserve', { action: 'addToCart', id: _id, num: _quantity}, function(data){
        if(order.length < 5){
            var flag = true, _total=0;
            order.forEach(element => {
                _total += parseInt(element.price);
                if(element.id == _id){
                    flag = false;
                }
            });
            if(flag){
                if (order.length<=1)
                {
                    var noOrder = "<div class='row ordername'><center><p></p></center></div>"       
                    $('.order-container').html(noOrder);
                    var newOrder = "<div class='row ordername id_"+ _id +"'><div class='col-md-8'><span class='badge'>" + _quantity + "</span> " + _name + "</div><div class='col-md-4'>&#8369; " + _price + ".00 <a href='#' onclick='removeToCart(\""+ _id +"\")'><span class='glyphicon glyphicon-remove' title='Remove' aria-hidden='true'></span></a></div></div>"       
                    $('.order-container').append(newOrder);
                }
                else{
                    var newOrder = "<div class='row ordername id_"+ _id +"'><div class='col-md-8'><span class='badge'>" + _quantity + "</span> " + _name + "</div><div class='col-md-4'>&#8369; " + _price + ".00 <a href='#' onclick='removeToCart(\""+ _id +"\")'><span class='glyphicon glyphicon-remove' title='Remove' aria-hidden='true'></span></a></div></div>"       
                    $('.order-container').append(newOrder);
                    order.push({
                    id: _id,
                    name: _name,
                    price: _price,
                    quant: _quantity
                });
                }
                $('.totalParag').html(_total + parseInt(_price * _quantity));
                document.cookie = "cart:" + order;
            }else{
                alert("Same entry is already reserved!");
            }
        }else{
            alert("Reservation limit is reached! (5 services)");
        }
    //});
}

function addCartModal1(data) {
    var id = data.id;
    var serviceName = data.name;
    var price = $("#item-"+id +" input[name='radiohw1']:checked").val();
    $('#serviceHolder').html(serviceName);
    $('#serviceHolder').val(serviceName);
    $('#priceHolder').html(price);
    $('#priceHolder').val(price);
    $('#item_id').val(id);
}

function removeToCart(param){
    $('#myModal').modal('show');
    $('.id_'+param).remove();
    var x=0, a=-1, _total=0;
    order.forEach(element => {
        _total += parseInt(element.price) * parseInt(element.quant);
        if(element.id == param){
            a=x;
            _total -= parseInt(element.price) * parseInt(element.quant);
        }else{
            x++;
        }
    });    
    if(a!=-1){
        order.splice(a,1);
        $('.totalParag').html(_total);
    }
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
    if(total == 0){
        orders += "<center><h3>Nothing Selected</h3></center>";
    }
    orders += "<br><br><p style='text-align: right; font-size: 17px;'><strong>Total: </strong><span style='font-size: 15px;' class='badge'> &#8369; "+ total +".00</span></p>";
    $('.viewOrderMod').html(orders);
}

function validateInfo(){
    var _userdata = $('#userData').serializeArray();
    userData.name = _userdata[0].value;
    userData.number = _userdata[1].value;
    userData.address = _userdata[2].value;
    userData.data = _userdata[3].value;
    userData.cart = order;

    document.cookie = "userInfo:" + userData;
    //Some validation here. then add condition sa baba.
    
    $('#getUserData').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#doneOrderModal').modal('toggle');
}

function submitReservation(){
    $.post('/reserve', {action: 'reserve', data: JSON.stringify(userData)},function(returndata){
        if(returndata){
            alert('Successfully Reserve!');
            window.location="/";
        }else{
            alert("Can't process you request. Try again later.");
            window.location="/reserve";
        }
    });
}

function hideMenuExcept(param){
    if(param != -1){
        $('.menu-show').addClass('menu');
        $('.menu-show').removeClass('menu-show');
        $('.menu-'+param).removeClass('menu');
        $('.menu-'+param).addClass('menu-show');
        $('.menu-show').css("display", "inline");
        $('.menu').css("display", "none");
    }else{
        $('.menu').css("display", "inline");
    }
}

function searchService(){
    var look = $('#search-bar').val();
    serv.forEach(element => {
        if(look.toLowerCase() == element.name.toLowerCase()){
            hideMenuExcept(element.category);
        }
    });
}

function successAlert()
{
    swal("Good job!", "You clicked the button!", "success");
}

function doneFunction()
{
    document.getElementById("servtype1").checked = false;
    document.getElementById("servtype2").checked = false;
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("gender1").checked = true;
    document.getElementById("gender2").checked = false;
    document.getElementById("address").value = "";
    document.getElementById("contnum").value = "";
    document.getElementById("date").value = "02-04-2018";
    document.getElementById("time").value = "12:00";
    document.getElementById("agree").checked = false;
    $("#step-1").show();
    $("#step-2").hide();
    $("#step-3").hide();
}
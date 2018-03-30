var service;
var operation;

$(function(){
    var getData = function(cb){
        $.get('reserve/data', function(res){
            if (res === undefined) {
                alert('Server Connection Timeout, Try again later');
                console.error('Server response error');
                return;
            }else{
                service = res;
                cb();
            }
        });
    }
    var displayToDD = function(){
        //Service Dropdown
        var html = "<option>All Services</option>";
        service.categories.forEach(element => {
            html += "<option>" + element.name +"</option>";
        });
        $('#serviceDD').html(html);

        //Service List
        service.categories.forEach(element => {
            html = "<div id='cat_"+ element.id +"' class='cat'><h4>"+ element.name +"</h4><br>";
            html += " <table class='table clickable-row table-hover'>";
            service.services.forEach(x => {
                if(x.category == element.id){
                    html += "<tr><td onclick='showDetail(\""+ x.id +"\")'>"+ x.name +"</td></tr>";
                }
            });
            html += "</table><hr></div>";
            $('#serviceList').append(html);
        });
    }
    var hideMenuExcept = function(param){
        $('.no_result').css('display', 'none');                    
        if(param == -1){
            $('.cat').css('display', 'inline');
        }else if(param == -2){
            $('.cat').css('display', 'none');
            $('.no_result').css('display', 'inline');            
        }else{
            $('.cat').css('display', 'none');
            $('#cat_'+param).css('display', 'inline');
        }
    }
    operation = [getData, displayToDD, hideMenuExcept];
    getData(displayToDD);
});
//This is called by every row in the Service List.
function showDetail(param){
    var displayDetail = function(data){
        var getCatName = function(_id, cb){
            service.categories.forEach(y => {
                if(y.id == _id){
                   cb(y.name);
                }
            });
        }
        getCatName(data.category,function(catName){
            var html = "<br><img class='img-responsive' style='float: left; padding-right: 30px;' width='100' height='50' src='../assets/images/icon-lotus.png' alt='Lotus-image'>";               
            html += "<table class='tableserv'>";
            html += "<p class='servName'>"+ data.name +"</p>";
            html += "<p class='servCode'>ServiceID:" + data.id + "</p><br>";
            html += "<p class='servCateg'><span>Category: </span> "+ catName +"</p>";
            html += "<p class='servPrice'><span>Price: </span>&#8369;"+ data.amount +"</p>";
            html += "<p class='servDesc'><span>Description: </span>"+ data.desc +"</p></table>";
            $('#serviceDetail').html(html);

            $('.btnEdit').attr('href','#modalEdit');            

            //This is called when Edit button press.            
            $('.btnEdit').on('click', function(){
                $('#servIdEdit').val(data.id);
                $('#servNameEdit').val(data.name);
                $('#servPriceEdit').val(data.amount);
                $('#servDescEdit').val(data.desc);
            });
            //Delete
            $('.btnDel').on('click', function() {
                var flag = confirm('Are you sure? This action is irreversible.');
                if(flag){
                    $.post('admin/delService',{id:data.id}, function(res, status){
                        if(res.error <= 0){
                            update();
                            alert('Successfully Delete.');
                        }else{
                            alert("Can't process your request, please try again later.");                            
                        }
                    });
                }
            });
            //Save
            $('#update').click(function(){
                var flag = confirm('Are you sure you want to submit?');
                if(flag){
                    var _id = $('#servIdEdit').val();
                    var _name = $('#servNameEdit').val();
                    var _price = $('#servPriceEdit').val();
                    var _cat = data.category;
                    var _desc = $('#servDescEdit').val();

                    //Some validations here.
                    var validated = true; //change this to false pag may validations na.

                    if(validated){
                        $.post('admin/updateService', {
                            id: _id,
                            name: _name,
                            price: _price,
                            cat: _cat,
                            desc: _desc
                        }, function(res){
                            if(res.error <= 0){
                                update();
                                alert('Successfully change.');
                            }else{
                                alert("Can't process your request, please try again later.");                                                            
                            }
                        });
                    }
                }
            });
            //Reset
            $('#btnPrim2').click(function () {
                document.getElementById('servIdEdit').value = data.id;
                document.getElementById('servNameEdit').value = data.name;
                document.getElementById('servPriceEdit').value = data.amount;
                document.getElementById('servDescEdit').value = data.desc;
            });
        });
    }

    service.services.forEach(x => {
        if(x.id == param){
            displayDetail(x);
        }
    });
}

function update(){
    $('#serviceDetail').html("");
    $('#serviceList').html("");
    operation[0](operation[1]);
}

function selectCat(){
    var hideMenuExcept = operation[2];
    var cat = $('#serviceDD').val();
    if(cat == 'All Services'){
        hideMenuExcept(-1); 
    }else{
        service.categories.forEach(element =>{
            if(element.name == cat){
                hideMenuExcept(element.id);
            }
        });
    }
}

function searchCat(){
    var key = $('#search_box').val().toLowerCase();
    var hideMenuExcept = operation[2];
    var test = [false, false];
    service.services.forEach(elem => {
        if(elem.name.toLowerCase() == key){
            service.categories.forEach(ele=>{
                if(ele.id == elem.category){
                    hideMenuExcept(ele.id);
                    test[0] = true;
                }
            });
        }
    });
    service.categories.forEach(elem=>{
        if(elem.name.toLowerCase() == key){
            hideMenuExcept(elem.id);
            test[1] = true;
        }
    });
    if(!test[0] && !test[1]){
        hideMenuExcept(-2);
    }
}
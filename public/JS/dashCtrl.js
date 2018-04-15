var service;
var servName = {};
var servPrice = {};
var staff;
var staffName = {};
var operation;
var selectedService = null;
var selectedStaff = null;
var reserList = [];
var reserEvent = [];
var nR, gR, aR, cnR, stR, rsR, taR, tR;

$(function () {
    //swal("Success!", "You are now logged in as an administrator.", "success");
    $('input.timepicker').timepicker({
        timeFormat: 'h:mm:ss p',
        minTime: '11:45:00', // 11:45:00 AM,
        maxHour: 20,
        maxMinutes: 30,
        startTime: new Date(0, 0, 0, 15, 0, 0), // 3:00:00 PM - noon
        interval: 15 // 15 minutes
    });

    loadReservation();

    var _getData = function (cb) {
        $.get('reserve/data', function (res) {
            if (res === undefined) {
                swal("Oops!", "Server Connection Timeout. Try again later!", "error");
                console.error('Server response error');
                return;
            } else {
                service = res;
                cb();
            }
        }).fail(function (xhr, status, error) {
            confirmFunction(-1, "Server Connection Timeout. Try again later!");
        });
        $.get('admin/categories', function (res) {
            if (res.error == 0) {
                var html = "";
                res.data.forEach(element => {
                    html += "<option value='" + element.id + "'>" + element.name + "</option>";
                });
                $('.categList').html(html);
            }
        });
    }
    var _displayToDD = function () {
        //Service Dropdown
        var html = "";
        service.categories.forEach(element => {
            var temp = "<option value='" + element.id + "'>" + element.name + "</option>";
            html += temp;
        });
        $('#serviceDD').html("<option>All Services</option>" + html);

        //Service List
        var sopt = "";
        service.categories.forEach(element => {
            html = "<div id='cat_" + element.id + "' class='cat'><h4>" + element.name + "</h4><br>";
            html += " <table class='table clickable-row table-hover'>";
            service.services.forEach(x => {
                if (x.category == element.id) {
                    html += "<tr><td onclick='showDetail(\"" + x.id + "\")'>" + x.name + "</td></tr>";
                    sopt += "<option value='" + x.id + "'>" + x.name + "</option>";
                    servName['' + x.id] = x.name;
                    servPrice['' + x.id] = x.amount;
                }
            });
            html += "</table><hr></div>";
            $('#serviceList').append(html);
        });
        $('.servicesOption').html(sopt);
        sessionUpdate();
    }
    var _hideMenuExcept = function (param) {
        $('.no_result').css('display', 'none');
        if (param == -1) {
            $('.cat').css('display', 'inline');
        } else if (param == -2) {
            $('.cat').css('display', 'none');
            $('.no_result').css('display', 'inline');
        } else {
            $('.cat').css('display', 'none');
            $('#cat_' + param).css('display', 'inline');
        }
    }
    var _sendServData = function (action, data, cb) {
        var links = ['admin/addService', 'admin/addCategory', 'admin/delCategory'];
        $.post(links[action], data, function (res) {
            if (res.error == 0) {
                cb(true, null);
            } else if (res.error == 2) {
                cb(true, res.detail);
            } else {
                cb(false);
            }
        }).fail(function (xhr, status, error) {
            cb(false);
        });
    }
    var _sendStaffData = function (action, data, cb) {
        var links = ['addEmployee', 'delEmployee', 'editEmployee', 'employeeTrans'];
        $.post("admin/" + links[action], data, function (res) {
            if (res.error == 0) {
                cb(true, null);
            } else if (res.error == 2) {
                cb(true, res.detail);
            } else {
                cb(false);
            }
        }).fail(function (xhr, status, error) {
            cb(false);
        });
    }
    var _getStaffData = function () {
        $.get('admin/employees', function (res) {
            if (res.error == 0) {
                staff = res.data;
                var html = "";
                var html1 = "";
                var count = 0;
                staff.forEach(x => {
                    html += "<tr><td onclick='showStaffDetail(\"" + count + "\")'>" + x.name + "</td></tr>";
                    count++;
                    staffName['' + x.id] = x.name;
                    html1 += "<option value='" + x.id + "'>" + x.name + "</option>";
                });
                $('#tList').html(html);
                $('.therapist').html(html1);

                operation['availStaff'] = function () {
                    var available = [];
                    var addToAvail = function (cb) {
                        var x = staff.length;
                        staff.forEach(a => {
                            available.push(a.id);
                            x--;
                            if (x == 0) cb();
                        });
                    }
                    var delUnavail = function (cb) {
                        var count = sessions.length;
                        sessions.forEach(x => {
                            var z = $.inArray(parseInt(x.data.tID), available);
                            if (z !== -1) {
                                available.splice(z, 1);
                            }
                            count--;
                            if (count == 0) cb();
                        });
                    }
                    addToAvail(function () {
                        delUnavail(function () {
                            var html = "";
                            staff.forEach(x => {
                                if ($.inArray(parseInt(x.id), available) != -1) {
                                    html += "<option value='" + x.id + "'>" + x.name + "</option>";
                                }
                            });
                            $('.therapist').html(html);
                        });
                    });
                }
                showStaffDetail(0);
            }
        });
    }

    operation = {
        getData: _getData,
        displayToDD: _displayToDD,
        hideMenuExcept: _hideMenuExcept,
        sendServData: _sendServData,
        sendStaffData: _sendStaffData,
        getStaffData: _getStaffData
    };

    //This is called when Edit button is pressed            
    $('.btnEdit').on('click', function () {
        editServ();
    });
    //Delete
    $('.btnDel').on('click', function () {
        if (selectedService != null) {
            delServ();
        }
    });
    //Save
    $('#update').click(function () {
        document.getElementById('modques').innerHTML = "Are you sure you want to update this service/treatment?";
        $('#confirmModal').modal('show');
        $('#btnone').off();
        $('#btnone').click(updateServ);
    });
    //Reset
    $('#btnPrim2').click(function () {
        editServ();
    });
    $('#btnAddSess').click(function () { //Actions when submitting new session
        var st = $('#servtypelist').val();
        var custNameNS = document.getElementById("custNameNS").value;
        var add = document.getElementById("address").value;
        var cont = document.getElementById("contnum").value;
        var serv = $('.sessServ').val();
        var amt = document.getElementById("totAmtNs").value;

        if (document.getElementById("servtypelist").value == "1") {
            if (custNameNS == "" || custNameNS.length == 0 || custNameNS == null || serviceTot == "") {
                swal("Oops!", "Please fill out all required fields.", "error");
            }
            else {
                var data = {
                    name: custNameNS,
                    address: add,
                    contact: cont,
                    sID: serv,
                    tID: $('#therapist').val(),
                    stype: st,
                    services: serviceSelc
                };
                transaction.addSession(data, function (res) {
                    if (res == 0) {
                        swal("Success!", "Session has been created!", "success");
                        $('#newSessionModal').modal('hide');
                        sessionUpdate();
                    } else {
                        confirmFunction(-1);
                    }
                });
                //ADD connection to db and session table here
            }
        }
        else {
            if (custNameNS == "" || custNameNS.length == 0 || custNameNS == null
                || serv == "" || serv.length == 0 || serv == null
                || add == "" || add.length == 0 || add == null
                || cont == "" || cont.length == 0 || cont == null) {
                //|| amt == "" || amt.length == 0 || amt == null) {
                swal("Oops!", "Please fill out all required fields.", "error");
            }
            else {
                var data = {
                    name: custNameNS,
                    address: add,
                    contact: cont,
                    sID: serv,
                    tID: $('#therapist').val(),
                    stype: st,
                    services: serviceSelc
                };
                transaction.addSession(data, function (res) {
                    if (res == 0) {
                        swal("Success!", "Session has been created!", "success");
                        $('#newSessionModal').modal('hide');
                        sessionUpdate();
                    } else {
                        confirmFunction(-1);
                    }
                });
                //ADD connection to db and session table here
            }
        }
    });
    $('#btnCancR').click(function () {
        $('#btnEditR').show();
        $('#btnEditR2').hide();
        $(".sched-details").show();
        $(".edit-details").hide();
    });
    $('.mail_list').click(function () {
        var x = "(READ)&nbsp;";
        var y = "(UNREAD)&nbsp;";
        var z = document.getElementById('read').innerHTML;
        if (z = "(UNREAD)&nbsp;") {
            document.getElementById('read').innerHTML = x;
        }
    });
    $('#btnEditR').click(function () {
        $('#btnEditR').hide();
        $('#btnEditR2').show();
        $(".sched-details").hide();
        $(".edit-details").show();
    });
    $('#btnCancR').click(function () {
        $('#btnEditR').show();
        $('#btnEditR2').hide();
        $(".sched-details").show();
        $(".edit-details").hide();
    });

    _getData(_displayToDD);
    _getStaffData();
    loadDashboard();
});
//This is called by every row in the Service List.
function showDetail(param) {
    var displayDetail = function (data) {
        var getCatName = function (_id, cb) {
            service.categories.forEach(y => {
                if (y.id == _id) {
                    cb(y.name);
                }
            });
        }
        getCatName(data.category, function (catName) {
            var html = "<br><img class='img-responsive' style='float: left; padding-right: 30px;' width='100' height='50' src='../assets/images/icon-lotus.png' alt='Lotus-image'>";
            html += "<table class='tableserv'>";
            html += "<br><p class='servName'>" + data.name + "</p><br>";
            html += "<p class='servCateg'><span>Category: </span> " + catName + "</p>";
            html += "<p class='servPrice'><span>Price: </span>&#8369;" + data.amount + "</p>";
            html += "<p class='servDesc'><span>Description: </span>" + data.desc + "</p></table>";
            $('#serviceDetail').html(html);
        });
    }
    service.services.forEach(x => {
        if (x.id == param) {
            displayDetail(x);
            selectedService = x;
        }
    });
    $('.btnEdit').attr('href', '#modalEdit');
}

function update() {
    $('#serviceDetail').html("");
    $('#serviceList').html("");
    $('.btnEdit').attr('href', '');
    selectedService = null;
    operation.getData(operation.displayToDD);
}

function selectCat() { //Removed ADD CATEGORY and REMOVE CATEGORY when specific category is selected from the list
    var hideMenuExcept = operation.hideMenuExcept;
    var cat = $('#serviceDD').val();
    if (cat == 'All Services') {
        $('#divcategorydynamic').show();
        $('#divcategoryfixed').hide();
        $('#btnAddS').show();
        $('#btnRemC').show();
        $('#btnAddC').show();
        hideMenuExcept(-1);
    } else {
        $('#divcategoryfixed').show();
        $('#divcategorydynamic').hide();
        $('#btnAddC').hide();
        $('#btnRemC').hide();
        service.categories.forEach(element => {
            if (element.id == cat) {
                hideMenuExcept(element.id);
                document.getElementById('categoryfixed').value = element.name;
                $('.addServ').val(element.id);
                // Placed value of selected category to categoryfixed textfield
            }
        });
    }
}

function searchCat() {
    var key = $('#search_box').val().toLowerCase();
    var hideMenuExcept = operation.hideMenuExcept;
    if (key === "") {
        hideMenuExcept(-1);
        return;
    }
    var test = [false, false];
    service.services.forEach(elem => {
        if (elem.name.toLowerCase() == key) {
            service.categories.forEach(ele => {
                if (ele.id == elem.category) {
                    hideMenuExcept(ele.id);
                    test[0] = true;
                }
            });
        }
    });
    service.categories.forEach(elem => {
        if (elem.name.toLowerCase() == key) {
            hideMenuExcept(elem.id);
            test[1] = true;
        }
    });
    if (!test[0] && !test[1]) {
        hideMenuExcept(-2);
    }
}

function resetcategory() { //reset ADD CATEGORY fields every time it is opened 
    document.getElementById('newCategName').value = "";
}

function resetservice() { //reset ADD SERVICE fields every time it is opened 
    document.getElementById('servNameAdd').value = "";
    document.getElementById('servPriceMaleAdd').value = "100";
    document.getElementById('servPriceFemaleAdd').value = "100";
    document.getElementById('servDescEdit').value = "";
}

function addCategory() { //validation if there are empty fields when clicking ADD on ADD CATEGORY + FUNCTION (T)
    var x = document.getElementById('newCategName').value;
    if (x == "" || x.length == 0 || x == null) {
        swal("Oops!", "Please enter the category name.", "error");
    }
    else {
        document.getElementById('modques').innerHTML = "Are you sure you want to create this category?";
        $('#confirmModal').modal('show');
        $('#btnone').off();
        $('#btnone').click(function () {
            operation.sendServData(1, { name: x }, function (conf, stat) {
                if (conf) {
                    if (stat != null) {
                        confirmFunction(-1, stat);
                    } else {
                        confirmFunction(1);
                        update();
                    }
                } else {
                    confirmFunction(-1);
                }
            });
        });
    }
    // ADD AN ELSE-IF FOR CATEGORY VALIDATION (E.G. HAS A SAME CATEGORY NAME)
    // DB CONNECTION FOR ADDING OF CATEGORY
}

function addService() { //validation if there are empty fields when clicking ADD on ADD SERVICE + FUNCTION (T)
    var _name = document.getElementById('servNameAdd').value;
    var _serviceType = $('#servPriceMaleAdd').val() === $('#servPriceFemaleAdd').val() ? 0 : 3;

    var _price = document.getElementById('servPriceMaleAdd').value == "" || document.getElementById('servPriceFemaleAdd').value == "" ? false :
        _serviceType == 0 ? document.getElementById('servPriceMaleAdd').value :
            document.getElementById('servPriceMaleAdd').value + "/" + document.getElementById('servPriceFemaleAdd').value;

    var _cat = $('.addServ').val();
    var _desc = $('.addServDesc').val();
    var _time = 60;
    if (_name == "" || _desc == "" || _price == false) {
        swal("Oops!", "Please fill out all required fields.", "error");
    } else {
        document.getElementById('modques').innerHTML = "Are you sure you want to create this service/treatment?";
        $('#confirmModal').modal('show');
        $('#btnone').off();
        $('#btnone').click(function () {
            var data = {
                name: _name,
                price: _price,
                cat: _cat,
                desc: _desc,
                st: _serviceType,
                time: _time
            }
            operation.sendServData(0, data, function (conf, detail) {
                if (conf == true) {
                    if (detail) {
                        confirmFunction(-1, detail);
                    } else {
                        confirmFunction(2);
                        update();
                    }
                } else {
                    confirmFunction(-1);
                }
            });
        });
    }
    // ADD AN ELSE-IF FOR CATEGORY VALIDATION (E.G. HAS A SAME SERVICE NAME IN THE SAME CATEGORY)
    // DB CONNECTION FOR ADDING OF SERVICES
    // MALE AND FEMALE FOR SERVICE TYPES
}

function removeCategory() { //REMOVE CATEGORY FUNCTION (T)
    document.getElementById('modques').innerHTML = "Are you sure you want to remove this category?";
    $('#confirmModal').modal('show');
    $('#btnone').off();
    $('#btnone').click(function () {
        var _id = $('.delCatList').val();
        operation.sendServData(2, { id: _id }, function (conf) {
            if (conf) {
                update();
                confirmFunction(3);
            } else {
                confirmFunction(-1);
            }
        });
    });
    //DB CONNECTION FOR DELETING OF CATEGORIES
    //CONFIRMATION MODAL
}

function cancelSession(x) { //REMOVE CATEGORY FUNCTION (T)

    document.getElementById('modques').innerHTML = "Are you sure you want to cancel/delete this session?";
    $('#confirmModal').modal('show');
    $('#btnone').off();
    $('#btnone').click(function () {
        transaction.delSession(x, function (res) {
            if (res == 0) {
                confirmFunction(4);
                sessionUpdate();
            } else {
                confirmFunction(-1);
            }
        });
    });
    //DB CONNECTION FOR DELETING OF SESSIONS
}

function doneSession(x) { //REMOVE CATEGORY FUNCTION (T)
    document.getElementById('modques').innerHTML = "Session finished?";
    $('#confirmModal').modal('show');
    var popSession = function (a, cb) {
        var count = sessions.length;
        sessions.forEach(b => {
            if (b.id == a) {
                return cb(b);
            }
            count--;
            if (count === 0) {
                cb(null);
            }
        });
    }
    $('#btnone').off();
    $('#btnone').click(function () {
        popSession(x, function (session) {
            $('#doneSessionModal').modal('show');
            $('#invtoName').html(session.data.name);
            $('#invtoAddress').html(session.data.address);
            $('#invtoContnum').html(session.data.contact);
            $('#invoiceNum').html(Math.floor(Math.random() * 1000000));
            $('#invPaymentDue').html(Date.parse('tomorrow').toString('MM/dd/yyyy'));
            selectedService = x;
            $('#servicesTable').html('');
            getSessionDetail(session);
            generateReceipt(session);
        });
    });
}

function servListChange() {
    if (document.getElementById("servtypelist").value == "1") {
        //alert ('Regular');
        $('#divaddress').hide();
        $('#divcontnum').hide();
    }
    else {
        //alert ('Home');
        $('#divaddress').show();
        $('#divcontnum').show();
    }
}

function getloadindiv() { //reset all fields whenever INDIVIDUAL SERVICES is clicked (T)
    document.getElementById('serviceDD').value = "All Services";
    document.getElementById('search_box').value = ""; //Task (-Search: If cleared, back to list of services (T)) shall be done for this to work, 
    //or else 'NO RESULTS FOUND will be displayed'
    //Display all services here  
    $('#divcategorydynamic').show();
    $('#divcategoryfixed').hide();
}

function confirmFunction(x, msg) {
    if (x == 1) {
        swal("Success!", "Category has been added to database!", "success");
        $('#addCategoryModal').modal('hide');
    }
    else if (x == 2) {
        swal("Success!", "Service has been added to database!", "success");
        $('#addServiceModal').modal('hide');
    }
    else if (x == 3) {
        swal("Success!", "Category has been removed from the database!", "success");
        $('#removeCategoryModal').modal('hide');
    }
    else if (x == 4) {
        swal("Success!", "Session has been cancelled/removed!", "success");
        $('#removeCategoryModal').modal('hide');
    } else if (x == 5) {
        swal("Success!", "New therapist has been added to database!", "success");
        $('#addTherapistModal').modal('hide');
    }
    else if (x == 6) {
        swal("Success!", "Session has been created!", "success");
        $('#newSessionModal').modal('hide');
    }
    else if (x == 7) {
        swal("Success!", "", "success");
        $('#doneSessionModal').modal('hide');
    }
    else if (x == 8) {
        swal("Success!", "Therapist has been removed from the database!", "success");
        $('#removeCategoryModal').modal('hide');
    }
    else if (x == 9) {
        swal("Success!", "Therapist details has been updated!", "success");
        $('#editTherapistModal').modal('hide');
    }
    else if (x == 10) {
        swal("Success!", "Reservation has been approved!", "success");
        resetsched();
        changeToGreen();
    }
    else if (x == 11) {
        swal("Success!", "Reservation has been cancelled!", "success");
        resetsched();
        changeToRed();
    }
    if (x == -1) {
        if (msg) {
            swal("Oops!", msg, "error");

        } else {
            swal("Oops!", "Can't process your request, please try again later.", "error");
        }
    } else if (x == 0) {
        swal("Success!", msg, "success");
    }
}

function resetsession() { //resets fields when NEW SESSION is clicked
    serviceTot = 0;
    serviceSelc = "";
    $('#divaddress').hide();
    $('#divcontnum').hide();
    document.getElementById("servtypelist").value = "1";
    document.getElementById("custNameNS").value = "";
    document.getElementById("gender1").checked = true;
    document.getElementById("gender2").checked = false;
    document.getElementById("address").value = "";
    document.getElementById("contnum").value = "";
    document.getElementById("selectedServ").value = "";
    document.getElementById("totAmtNs").value = "";
    document.getElementById("serviceSS").value = 0; //TUPS: Reset it to first item    
}

function servtypelistleave() { //Actions on HOME and REGULAR SERVICE (NEW SESSION)

    if (document.getElementById("servtypelist").value == "1") {
        $('#divaddress').hide();
        $('#divcontnum').hide();
        $('#datediv').hide();
        $('#timediv').hide();
    }
    else {
        $('#divaddress').show();
        $('#divcontnum').show();
        $('#datediv').show();
        $('#timediv').show();
    }
}

function resettherapist() {
    document.getElementById('fnTherap').value = "";
    document.getElementById('lnTherap').value = "";
    document.getElementById('addressT').value = "";
    document.getElementById('contnumT').value = "";
    document.getElementById("gender1T").checked = true;
    document.getElementById("gender2T").checked = false;
}

function removeTherapist() { //REMOVE CATEGORY FUNCTION (T)

    document.getElementById('modques').innerHTML = "Are you sure you want to remove?";
    $('#confirmModal').modal('show');
    $('#btnone').off();
    $('#btnone').click(function () {
        operation.sendStaffData(1, { id: selectedStaff.id }, function (res, detail) {
            if (res) {
                confirmFunction(4);
                operation.getStaffData();
            } else {
                confirmFunction(-1);
            }
        });
    });
    //DB CONNECTION FOR DELETING OF SESSIONS
}

function addTherapist() {
    var fn = document.getElementById("fnTherap").value;
    var ln = document.getElementById("lnTherap").value;
    var add = document.getElementById("addressT").value;
    var cont = document.getElementById("contnumT").value;
    if (fn == "" || fn.length == 0 || fn == null
        || ln == "" || ln.length == 0 || ln == null
        || add == "" || add.length == 0 || add == null
        || cont == "" || cont.length == 0 || cont == null) {
        swal("Oops!", "Please fill out all required fields.", "error");
    }
    else {
        document.getElementById('modques').innerHTML = "Are you sure you want to add this therapist?";
        $('#confirmModal').modal('show');

        $('#btnone').off();
        $('#btnone').click(function () {
            var data = {
                name: fn + " " + ln,
                contact: cont,
                address: add,
                gender: "Female",
            }
            //ADD connection to db and therapist table here
            operation.sendStaffData(0, data, function (res, msg) {
                if (res) {
                    if (msg) {
                        confirmFunction(-1, msg);
                    } else {
                        confirmFunction(5);
                        operation.getStaffData();
                    }
                }
            });
        });
    }
}

function resetEditTherapist() {
    document.getElementById('fnTherapEdit').value = selectedStaff.name.split(' ')[0];
    document.getElementById('lnTherapEdit').value = selectedStaff.name.split(' ')[1];
    document.getElementById('addressTEdit').value = selectedStaff.address;
    document.getElementById('contnumTEdit').value = selectedStaff.contact;
    document.getElementById("gender1TEdit").checked = false;
    document.getElementById("gender2TEdit").checked = true;
}

function editTherapist() {
    //Connection to db here: Input data from db to textboxes
    var fn = document.getElementById("fnTherapEdit").value;
    var ln = document.getElementById("lnTherapEdit").value;
    var add = document.getElementById("addressTEdit").value;
    var cont = document.getElementById("contnumTEdit").value;

    if (fn == "" || fn.length == 0 || fn == null
        || ln == "" || ln.length == 0 || ln == null
        || add == "" || add.length == 0 || add == null
        || cont == "" || cont.length == 0 || cont == null) {
        swal("Oops!", "Please fill out all required fields.", "error");
    }
    else {
        document.getElementById('modques').innerHTML = "Are you sure you want to update this therapist details?";
        $('#confirmModal').modal('show');

        $('#btnone').off();
        $('#btnone').click(function () {
            var data = {
                id: selectedStaff.id,
                name: fn + " " + ln,
                contact: cont,
                address: add,
                gender: "Female"
            };
            //console.log(data);
            operation.sendStaffData(2, data, function (res) {
                if (res) {
                    confirmFunction(9);
                    operation.getStaffData();
                } else {
                    confirmFunction(-1);
                }
            });
            //ADD connection to db and therapist table here
        });
    }
    //DB CONNECTION FOR UPDATING OF THERAPIST
}

function approveReq() {

}

/* My fix dun sa multiple action error, even thou di na nag aappear sa ui yung action sa db ganun parin.
 so here's my fix for it. */
function editServ() {
    $('#servIdEdit').val(selectedService.id);
    $('#servNameEdit').val(selectedService.name);
    var prices = selectedService.amount.split('/');
    $('#servPriceMaleEdit').val(prices[0]);
    $('#servPriceFemaleEdit').val(prices[1]);
    $('.editDesc').val(selectedService.desc);
}
function delServ() {
    document.getElementById('modques').innerHTML = "Are you sure you want to remove this service/treatment from the database?";
    $('#confirmModal').modal('show');
    $('#btnone').off();
    $('#btnone').click(function () {
        $.post('admin/delService', { id: selectedService.id }, function (res, status) {
            if (res.error <= 0) {
                update();
                swal("Success!", "Service has been deleted from the database!", "success");
            } else {
                swal("Oops!", "Can't process your request, please try again later.", "error");
            }
        });
    });
}
function updateServ() {
    var _id = selectedService.id;
    var _name = $('#servNameEdit').val();
    var _st = $('#servPriceMaleEdit').val() == $('#servPriceFemaleEdit').val() ? 0 : 3;
    var _price = _st === 0 ? $('#servPriceMaleEdit').val() :
        $('#servPriceMaleEdit').val() == "" || $('#servPriceFemaleEdit').val() == "" ? false : $('#servPriceMaleEdit').val() + "/" + $('#servPriceFemaleEdit').val();
    var _cat = $('.editModal').val();
    var _desc = $('.editDesc').val();
    var _oldName = selectedService.name;

    //Some validations here.
    var validated = false; //change this to false pag may validations na.
    if (_name != "" && _price != false && _desc != "") {
        validated = true;
    } else {
        swal("Oops!", "Please fill out all required fields.", "error");
    }

    if (validated) {
        $.post('admin/updateService', {
            id: _id,
            name: _name,
            price: _price,
            cat: _cat,
            desc: _desc,
            st: _st,
            old: _oldName
        }, function (res) {
            if (res.error == 0) {
                swal("Success!", "Service has been updated!", "success");
                $('#modalEdit').modal('hide');
                update();
            } else if (res.error == 2) {
                swal("Opps!", res.detail, "error");
            } else {
                swal("Oops!", "Can't process your request, please try again later.", "error");
                $('#modalEdit').modal('hide');
            }
        });
    }
}

function showStaffDetail(param) {
    var x = staff[param];
    $('.theName').html(x.name);
    $('#theSex').html(x.gender);
    $('#theAdd').html(x.address);
    $('#theCont').html(x.contact);
    $('#theTrans').html(x.count);
    selectedStaff = x;
}

function resetsched() {
    $('.sched-details').hide();
    $('.sched-details-none').show();
    $('#custnameSched').val("");
    $('#custgenderSched').val("");
    $('#custaddressSched').val("");
    $('#custcontnumSched').val("");
    $('#custservSched').val("");
    $('#custtotamtSched').val("");
    $('#custgenderSched').val("Male");
    $('#custtherapSched').val("");
    $('#btnConfReserv2').hide();
    $('#btnCancReserv2').hide();
    $('#btnConfReserv').show();
    $('#btnCancReserv').show();
    document.getElementById("custgenderSched").disabled = true;
    document.getElementById("btnConfReserv").disabled = true;
    document.getElementById("btnCancReserv").disabled = true;
    document.getElementById("custtherapSched").disabled = true;
    loadReservation();
}

function confirmReserv2() {
    var name = document.getElementById("custnameSched").value;
    var add = document.getElementById("custaddressSched").value;
    var cont = document.getElementById("custcontnumSched").value;
    var sety = document.getElementById("custservtype").value;
    var serv = document.getElementById("custservSched").value;
    var amt = document.getElementById("custtotamtSched").value;
    var ther = document.getElementById("custtherapSched").value;

    if (sety == "Home Service") {
        if (name == "" || name.length == 0 || name == null
            || add == "" || add.length == 0 || add == null
            || cont == "" || cont.length == 0 || cont == null
            || serv == "" || serv.length == 0 || serv == null
            || amt == "" || amt.length == 0 || amt == null
            || ther == "" || ther.length == 0 || ther == null
            || sety == "" || sety.length == 0 || sety == null) {
            swal("Oops!", "Please fill out all required fields.", "error");
        }
        else {
            document.getElementById('modques').innerHTML = "Are you sure you want to confirm this session?";
            $('#confirmModal').modal('show');

            $('#btnone').off();
            $('#btnone').click(function () {
                var count = 0;
                reserEvent.forEach(x => {
                    if (x._id == selectedService) {
                        var data = {
                            name: $('.reserName').val(),
                            address: $('.reserAdd').val(),
                            contact: $('.reserCont').val(),
                            sID: $('.reserServ').val(),
                            tID: $('#custtherapSched').val(),
                            amount: $('.reserTot').val()
                            //TUPS: Palagay dito yung sa therapist and type of service
                        };
                        transaction.addSession(data, function (res) {
                            if (res == 0) {
                                reserEvent.splice(count, 1);
                                $.post('admin/delSched', { id: x._id }, function (res) {
                                    if (res.error == 0) {
                                        confirmFunction(10);
                                        loadReservation();
                                    } else {
                                        confirmFunction(-1);
                                    }
                                }).fail(function () {
                                    confirmFunction(-1);
                                });
                            } else {
                                confirmFunction(-1);
                            }
                        });
                    }
                    count++;
                });
            });
        }
    }
    else {
        if (name == "" || name.length == 0 || name == null
            || serv == "" || serv.length == 0 || serv == null
            || amt == "" || amt.length == 0 || amt == null
            || ther == "" || ther.length == 0 || ther == null
            || sety == "" || sety.length == 0 || sety == null) {
            swal("Oops!", "Please fill out all required fields.", "error");
        }
        else {
            document.getElementById('modques').innerHTML = "Are you sure you want to confirm this session?";
            $('#confirmModal').modal('show');

            $('#btnone').off();
            $('#btnone').click(function () {
                var count = 0;
                reserEvent.forEach(x => {
                    if (x._id == selectedService) {
                        var data = {
                            name: $('.reserName').val(),
                            address: $('.reserAdd').val(),
                            contact: $('.reserCont').val(),
                            sID: $('.reserServ').val(),
                            tID: $('#custtherapSched').val(),
                            amount: $('.reserTot').val(),
                            stype: $('.reserST').val(),
                            services: serviceSelc
                        };
                        transaction.addSession(data, function (res) {
                            if (res == 0) {
                                reserEvent.splice(count, 1);
                                $.post('admin/delSched', { id: x._id }, function (res) {
                                    if (res.error == 0) {
                                        if (reserEvent.length == 1) { reserEvent = [] }
                                        confirmFunction(10);
                                        loadReservation();
                                        sessionUpdate();
                                        operation.availStaff();
                                    } else {
                                        confirmFunction(-1);
                                    }
                                }).fail(function () {
                                    confirmFunction(-1);
                                });
                            } else {
                                confirmFunction(-1);
                            }
                        });
                    }
                    count++;
                });
            });
        }
    }
}

function cancReserve() {
    document.getElementById('modques').innerHTML = "Are you sure you want to cancel this reservation?";
    $('#confirmModal').modal('show');

    $('#btnone').off();
    $('#btnone').click(function () {
        $.post('admin/delSched', { id: selectedService }, function (res) {
            if (res.error == 0) {
                confirmFunction(11);
                loadReservation();
            } else {
                confirmFunction(-1);
            }
        }).fail(function () {
            confirmFunction(-1);
        });
    });
    //DB CONNECTION FOR DELETING OF THERAPIST
}

function changeToGreen() {
    document.getElementById("ff").classList.add('fc-content2');
}

function changeToRed() {
    document.getElementById("ff").classList.add('fc-content3');
}

function confirmReserv() {
    $('#btnConfReserv2').show();
    $('#btnCancReserv2').show();
    $('#btnConfReserv').hide();
    $('#btnCancReserv').hide();

    nR = document.getElementById("custnameSched").value;
    gR = document.getElementById("custgenderSched").value;
    aR = document.getElementById("custaddressSched").value;
    cnR = document.getElementById("custcontnumSched").value;
    stR = document.getElementById("custservtype").value;
    rsR = document.getElementById("custservSched").value;
    taR = document.getElementById("custtotamtSched").value;
    tR = document.getElementById("custtherapSched").value;

    document.getElementById("custnameSched").disabled = false;
    document.getElementById("custgenderSched").disabled = false;
    document.getElementById("custaddressSched").disabled = false;
    document.getElementById("custcontnumSched").disabled = false;
    document.getElementById("custservSched").disabled = false;
    document.getElementById("custservtype").disabled = false;
    document.getElementById("custgenderSched").disabled = false;
    document.getElementById("custtherapSched").disabled = false;
}

function cancReserve2() {
    document.getElementById("custnameSched").value = nR;
    document.getElementById("custgenderSched").value = gR;
    document.getElementById("custaddressSched").value = aR;
    document.getElementById("custcontnumSched").value = cnR;
    document.getElementById("custservtype").value = stR;
    document.getElementById("custservSched").value = rsR;
    document.getElementById("custtotamtSched").value = taR;
    document.getElementById("custtherapSched").value = tR;

    $('#btnConfReserv2').hide();
    $('#btnCancReserv2').hide();
    $('#btnConfReserv').show();
    $('#btnCancReserv').show();
    document.getElementById("custnameSched").disabled = true;
    document.getElementById("custgenderSched").disabled = true;
    document.getElementById("custaddressSched").disabled = true;
    document.getElementById("custcontnumSched").disabled = true;
    document.getElementById("custservSched").disabled = true;
    document.getElementById("custtotamtSched").disabled = true;
    document.getElementById("custgenderSched").disabled = true;
    document.getElementById("custtherapSched").disabled = true;
}
var xhalsdj = "";
function loadReservation() {
    var loadData = function () {
        var events = [];
        reserList.forEach(x => {
            var date = x.reservationDate.split(' ')[0];
            var services = JSON.parse(x.service);
            wrappedItem(JSON.parse(x.service), function (total, names) {
                var event = {
                    title: x.name,
                    start: new Date(date),
                    end: new Date(date),
                    address: x.address,
                    contnum: x.contact,
                    amount: total,
                    services: names,
                    _id: x.id,
                    sex: x.isHomeService,
                    sID: xhalsdj
                }
                events.push(event);
                reserEvent = events;
                init_calendar();
                $("#calendar").fullCalendar('removeEvents');
                $("#calendar").fullCalendar('addEventSource', reserEvent);
            });
        });
    }
    $.get('/reserve/list', function (res) {
        if (res.error == 0) {
            reserList = res.data;
            loadData();
        }
    });
}

function removeSched(x) {
    reserEvent.forEach(a => {
        reserEvent.splice(x, 1);
        loadReservation();
    });
}

function wrappedItem(arr, cb) {
    var total = 0;
    var names = "";
    var out = function () {
        cb(total, names);
    }
    var count = arr.length;
    arr.forEach(x => {
        total += parseInt(x.price);
        names += x.name + "; \n";
        xhalsdj += x.id + "/";
        count--;
        if (count == 0) out();
    });
}
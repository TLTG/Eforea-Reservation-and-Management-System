var sessions = [];
var serviceTot = 0;
var serviceSelc = "";
var errorCount = 0;

var transaction = {
    loadSessions: function(cb){
        $.get('admin/customerSessionList', function(res){
            sessions = res;
            cb();
        });
    },
    addSession: function(_data, cb){
        $.post('admin/addSession', _data, function(res){
            if(res.error == 0){
                sessions.push({id:res.data, data: _data});
                cb(0);
            }else{
                cb(1);
            }
        }).fail(function(){
            cb(1);
        });
    },
    delSession: function(_id, cb){
        $.post('admin/delSession', {id: _id}, function(res){
            if(res.error == 0){
                cb(0);
            }else{
                cb(1);
            }
        }).fail(function(){
            cb(1);
        });
    },
    checkout: function(data, cb){
        $.post('admin/recSession', data, function(res){
            if(res.error == 0){
                cb(0);
            }else{
                cb(1);
            }
        });
    }
};

function sessionUpdate(){
    transaction.loadSessions(function(){
        var html1 = "";
        var html2 = "";
        sessions.forEach(x=>{
            var html = "";
            var serv = servName[x.data.sID] == undefined ? x.data.sID : servName[x.data.sID];
            html += "<tr>";
            html += "<td>"+ (parseInt(x.id) + 1) +"</td>";
            html += "<td>"+ x.data.name +"</td>";
            html += "<td>"+ staffName[x.data.tID] + "</td>";
            html += "<td>" + serv + "</td>";
            html += "<td><button class='btn buttonFinish' id='btnDoneTrans' type='button' onclick='doneSession(\""+ x.id +"\")' title='Done' style='width: 50px;'><span class='fa fa-check'></span></button><button class='btn buttonPrevious' id='btnCancTrans' type='button' onclick='cancelSession(\""+ x.id +"\")' title='Cancel/Remove' style'width: 50px;'><span class='fa fa-times'></span></button></td>";
            html += "</tr>";
            if(x.data.stype == 1){
                html1 += html;
            }else{
                html2 += html;
            }
        });
        $('.sessionList').html(html1);
        $('.homeSession').html(html2);
        $('#sessionNumber').html(sessions.length);
        operation.availStaff();
    });
}

function addToOrder(){
    var x = $('#serviceSS').val();
    $('#selectedServ').val($('#selectedServ').val() + servName[x] + ",");
    serviceTot +=  parseInt(servPrice[x+'']);
    $('#totAmtNs').val(serviceTot);
    serviceSelc += x + "/";
}

function doneFreakingSession(){
    transaction.checkout({id: selectedService, total: selectedStaff},function(res){
        if(res == 0){
            sessions.splice(selectedService, 1);
            confirmFunction(7);
            sessionUpdate();
        }else{
            if(errorCount == 0){
                doneFreakingSession();
                errorCount++;
            }else{
                confirmFunction(-1);
                errorCount = 0;
            }
        }
    });
}

function getSessionDetail(input){
    var serv = input.data.sID.split(',');
    var price = 0;
    serv.forEach(x=>{
        var name = x;
    
        if(x===''){
            
        }else{
            var count = 0;
            service.services.forEach(y=>{
                if(y.name===x){
                    price += parseInt(y.amount);
                    var html = "<tr><!--<td>1</td>--><td>" + name + "</td><td>" + y.amount + "</td></tr>";
                    $('#servicesTable').append(html);
                    $('.fnlPrice').html(price);    
                    selectedStaff = price;                        
                }
                count++;
            });
        }
    });
}

function loadDashboard(){
    $.get('admin/dashInfo', function(res){
        $('.totTran').html(res.transaction);
        $('.totRes').html(res.reservation);
        $('.totColT').html(res.tsale);
        $('.totColW').html(res.wsale);
        var html = "", count = 1;
        res.topEmployee.forEach(x=>{
            html += "<div><p><span class='fa fa-user-md'></span> " + x.name + "</p>";
            html += "<span id='most"+ count +"t#'> (" + x.count + "<small> transactions</small>)</span></p>";
            html += "<div><div class='progress progress_sm' style='width: 80%;'></div>";
            html += "<div class='progress-bar bg-purple' role='progressbar' data-transitiongoal='"+ x.count +"'></div></div>";
            html += "</div>"
        });
        $('.topThera').html(html);
    });
}
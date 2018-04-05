var sessions = [];
var serviceOrder = "";
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
                if(errorCount == 0){
                    transaction.addSession(_data, function(res1){
                        if(res1 == 0){
                            cb(0);
                        }
                    });
                }else{
                    cb(1);
                }
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

$(function(){
});

function sessionUpdate(){
    transaction.loadSessions(function(){
        var html = "";
        sessions.forEach(x=>{
            html += "<tr>";
            html += "<td>"+ (parseInt(x.id) + 1) +"</td>";
            html += "<td>"+ x.data.name +"</td>";
            html += "<td>"+ staffName[x.data.tID] + "</td>";
            html += "<td>" + servName[x.data.sID] + "</td>";
            html += "<td><button class='btn buttonFinish' id='btnDoneTrans' type='button' onclick='doneSession(\""+ x.id +"\")' title='Done' style='width: 50px;'><span class='fa fa-check'></span></button><button class='btn buttonPrevious' id='btnCancTrans' type='button' onclick='cancelSession(\""+ x.id +"\")' title='Cancel/Remove' style'width: 50px;'><span class='fa fa-times'></span></button></td>";
            html += "</tr>";
        });
        $('.sessionList').html(html);
        $('#sessionNumber').html(sessions.length);
    });
}

function addToOrder(){
    var x = $('#serviceSS').val();
    $('#selectedServ').val($('#selectedServ').val() + servName[x] + "\n");
    serviceOrder += "/" + x;
}

function doneFreakingSession(){
    transaction.checkout({id: selectedService, total: selectedStaff},function(res){
        if(res == 0){
            sessions.splice(selectedService, 1);
            confirmFunction(7);
            sessionUpdate();
        }else{
            confirmFunction(-1);
        }
    });
}
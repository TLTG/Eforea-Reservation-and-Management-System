$(document).ready(function(){
	// legend
	// .right_col home
	// .right_col2 individual services
	// .right_col3 schedule
	// .right_col4 reservations
	// .right_col5 therapists
	// .right_col6 packaged services
	// .right_col7 deleted services

	$("#home").click(function()
	{
		reset();
		$(".right_col2").hide();
		$(".right_col3").hide();
		$(".right_col4").hide();
		$(".right_col5").hide();
		$(".right_col").show();
	});

	$("#services1").click(function()
	{
		reset();
		$(".right_col").hide();
		$(".right_col3").hide();
		$(".right_col4").hide();
		$(".right_col5").hide();
		$(".right_col2").show();
	});

	$("#services2").click(function()
	{
		reset();
		$(".right_col").hide();
		$(".right_col3").hide();
		$(".right_col4").hide();
		$(".right_col5").hide();
		$(".right_col2").show();
	});

	$("#schedule").click(function()
	{
		reset();
		$(".right_col").hide();
		$(".right_col2").hide();
		$(".right_col4").hide();
		$(".right_col5").hide();
		$(".right_col3").show();
	});

	$("#reservations").click(function()
	{
		$(".right_col").hide();
		$(".right_col2").hide();
		$(".right_col3").hide();
		$(".right_col5").hide();
		$(".right_col4").show();
	});

	$("#therapists").click(function()
	{	
		reset();
		$(".right_col").hide();
		$(".right_col2").hide();
		$(".right_col3").hide();
		$(".right_col4").hide();
		$(".right_col5").show();
	});


	$(".msg").click(function()
	{
		$(".temp-msg").hide();
		//$(".inbox-body").show();
	});

	function modal1(data)
 	{
	    var head = data.head;
	    var prim = data.prim;
	    var def = data.def;
	    var newh = "hehe";

	    // $('#modalHeader').html(head);
	    // $('#btnPrim').html(prim);
	    // $('#btnDef').html(def);
	    // $('#modalBody').html(def);
	    // $('#modalBody').val(def);
	    $('#modal1').text("Edit Journal Voucher");
	    document.getElementById("modalHeader").text= "Hide Filter";
	    document.getElementById("modalBody").text= "Hide Filter";
	    document.getElementById("btnPrim").innerHTML= "Hide Filter";
	    document.getElementById("btnDef").innerHTML= "Hide Filter";
	}

	// $(".btnDeclineReq").click(function()
	// {
	// 	 var newh = "<p> hehe </p>";
	// 	 $('#modalBody').html(newh);
	// });

	// $(".fa-circle").click(function()
	// {
	// 	$(".fa-circle").hide();
	// 	$(".fa-circle-o").show();
	// });
/* (
	$('#btnserv1').click(function()
	{
		$("#serv1").show();
		$("#serv2").hide();
		$("#serv3").hide();
		$("#serv4").hide();
		$("#serv5").hide();
		$("#serv6").hide();
		$("#serv7").hide();
		$("#serv8").hide();
		$("#serv9").hide();
		$("#serv10").hide();
		document.getElementById("btnserv1").classList.add('activegrp1');
		document.getElementById("btnserv2").classList.remove('activegrp1');
		document.getElementById("btnserv3").classList.remove('activegrp1');
		document.getElementById("btnserv4").classList.remove('activegrp1');
		document.getElementById("btnserv5").classList.remove('activegrp1');
		document.getElementById("btnserv6").classList.remove('activegrp1');
		document.getElementById("btnserv7").classList.remove('activegrp1');
		document.getElementById("btnserv8").classList.remove('activegrp1');
		document.getElementById("btnserv9").classList.remove('activegrp1');
		document.getElementById("btnserv10").classList.remove('activegrp1');
	});

	$('#btnserv2').click(function()
	{
		$("#serv1").hide();
		$("#serv2").show();
		$("#serv3").hide();
		$("#serv4").hide();
		$("#serv5").hide();
		$("#serv6").hide();
		$("#serv7").hide();
		$("#serv8").hide();
		$("#serv9").hide();
		$("#serv10").hide();
		document.getElementById("btnserv1").classList.remove('activegrp1');
		document.getElementById("btnserv2").classList.add('activegrp1');
		document.getElementById("btnserv3").classList.remove('activegrp1');
		document.getElementById("btnserv4").classList.remove('activegrp1');
		document.getElementById("btnserv5").classList.remove('activegrp1');
		document.getElementById("btnserv6").classList.remove('activegrp1');
		document.getElementById("btnserv7").classList.remove('activegrp1');
		document.getElementById("btnserv8").classList.remove('activegrp1');
		document.getElementById("btnserv9").classList.remove('activegrp1');
		document.getElementById("btnserv10").classList.remove('activegrp1');

	});

	$('#btnserv3').click(function()
	{
		$("#serv1").hide();
		$("#serv2").hide();
		$("#serv3").show();
		$("#serv4").hide();
		$("#serv5").hide();
		$("#serv6").hide();
		$("#serv7").hide();
		$("#serv8").hide();
		$("#serv9").hide();
		$("#serv10").hide();
		document.getElementById("btnserv1").classList.remove('activegrp1');
		document.getElementById("btnserv2").classList.remove('activegrp1');
		document.getElementById("btnserv3").classList.add('activegrp1');
		document.getElementById("btnserv4").classList.remove('activegrp1');
		document.getElementById("btnserv5").classList.remove('activegrp1');
		document.getElementById("btnserv6").classList.remove('activegrp1');
		document.getElementById("btnserv7").classList.remove('activegrp1');
		document.getElementById("btnserv8").classList.remove('activegrp1');
		document.getElementById("btnserv9").classList.remove('activegrp1');
		document.getElementById("btnserv10").classList.remove('activegrp1');
	});

	$('#btnserv4').click(function()
	{
		$("#serv1").hide();
		$("#serv2").hide();
		$("#serv3").hide();
		$("#serv4").show();
		$("#serv5").hide();
		$("#serv6").hide();
		$("#serv7").hide();
		$("#serv8").hide();
		$("#serv9").hide();
		$("#serv10").hide();
		document.getElementById("btnserv1").classList.remove('activegrp1');
		document.getElementById("btnserv2").classList.remove('activegrp1');
		document.getElementById("btnserv3").classList.remove('activegrp1');
		document.getElementById("btnserv4").classList.add('activegrp1');
		document.getElementById("btnserv5").classList.remove('activegrp1');
		document.getElementById("btnserv6").classList.remove('activegrp1');
		document.getElementById("btnserv7").classList.remove('activegrp1');
		document.getElementById("btnserv8").classList.remove('activegrp1');
		document.getElementById("btnserv9").classList.remove('activegrp1');
		document.getElementById("btnserv10").classList.remove('activegrp1');
	});

	$('#btnserv5').click(function()
	{
		$("#serv1").hide();
		$("#serv2").hide();
		$("#serv3").hide();
		$("#serv4").hide();
		$("#serv5").show();
		$("#serv6").hide();
		$("#serv7").hide();
		$("#serv8").hide();
		$("#serv9").hide();
		$("#serv10").hide();
		document.getElementById("btnserv1").classList.remove('activegrp1');
		document.getElementById("btnserv2").classList.remove('activegrp1');
		document.getElementById("btnserv3").classList.remove('activegrp1');
		document.getElementById("btnserv4").classList.remove('activegrp1');
		document.getElementById("btnserv5").classList.add('activegrp1');
		document.getElementById("btnserv6").classList.remove('activegrp1');
		document.getElementById("btnserv7").classList.remove('activegrp1');
		document.getElementById("btnserv8").classList.remove('activegrp1');
		document.getElementById("btnserv9").classList.remove('activegrp1');
		document.getElementById("btnserv10").classList.remove('activegrp1');
	});

	$('#btnserv6').click(function()
	{
		$("#serv1").hide();
		$("#serv2").hide();
		$("#serv3").hide();
		$("#serv4").hide();
		$("#serv5").hide();
		$("#serv6").show();
		$("#serv7").hide();
		$("#serv8").hide();
		$("#serv9").hide();
		$("#serv10").hide();
		document.getElementById("btnserv1").classList.remove('activegrp1');
		document.getElementById("btnserv2").classList.remove('activegrp1');
		document.getElementById("btnserv3").classList.remove('activegrp1');
		document.getElementById("btnserv4").classList.remove('activegrp1');
		document.getElementById("btnserv5").classList.remove('activegrp1');
		document.getElementById("btnserv6").classList.add('activegrp1');
		document.getElementById("btnserv7").classList.remove('activegrp1');
		document.getElementById("btnserv8").classList.remove('activegrp1');
		document.getElementById("btnserv9").classList.remove('activegrp1');
		document.getElementById("btnserv10").classList.remove('activegrp1');
	});

	$('#btnserv7').click(function()
	{
		$("#serv1").hide();
		$("#serv2").hide();
		$("#serv3").hide();
		$("#serv4").hide();
		$("#serv5").hide();
		$("#serv6").hide();
		$("#serv7").show();
		$("#serv8").hide();
		$("#serv9").hide();
		$("#serv10").hide();
		document.getElementById("btnserv1").classList.remove('activegrp1');
		document.getElementById("btnserv2").classList.remove('activegrp1');
		document.getElementById("btnserv3").classList.remove('activegrp1');
		document.getElementById("btnserv4").classList.remove('activegrp1');
		document.getElementById("btnserv5").classList.remove('activegrp1');
		document.getElementById("btnserv6").classList.remove('activegrp1');
		document.getElementById("btnserv7").classList.add('activegrp1');
		document.getElementById("btnserv8").classList.remove('activegrp1');
		document.getElementById("btnserv9").classList.remove('activegrp1');
		document.getElementById("btnserv10").classList.remove('activegrp1');
	});

	$('#btnserv8').click(function()
	{
		$("#serv1").hide();
		$("#serv2").hide();
		$("#serv3").hide();
		$("#serv4").hide();
		$("#serv5").hide();
		$("#serv6").hide();
		$("#serv7").hide();
		$("#serv8").show();
		$("#serv9").hide();
		$("#serv10").hide();
		document.getElementById("btnserv1").classList.remove('activegrp1');
		document.getElementById("btnserv2").classList.remove('activegrp1');
		document.getElementById("btnserv3").classList.remove('activegrp1');
		document.getElementById("btnserv4").classList.remove('activegrp1');
		document.getElementById("btnserv5").classList.remove('activegrp1');
		document.getElementById("btnserv6").classList.remove('activegrp1');
		document.getElementById("btnserv7").classList.remove('activegrp1');
		document.getElementById("btnserv8").classList.add('activegrp1');
		document.getElementById("btnserv9").classList.remove('activegrp1');
		document.getElementById("btnserv10").classList.remove('activegrp1');
	});

	$('#btnserv9').click(function()
	{
		$("#serv1").hide();
		$("#serv2").hide();
		$("#serv3").hide();
		$("#serv4").hide();
		$("#serv5").hide();
		$("#serv6").hide();
		$("#serv7").hide();
		$("#serv8").hide();
		$("#serv9").show();
		$("#serv10").hide();
		document.getElementById("btnserv1").classList.remove('activegrp1');
		document.getElementById("btnserv2").classList.remove('activegrp1');
		document.getElementById("btnserv3").classList.remove('activegrp1');
		document.getElementById("btnserv4").classList.remove('activegrp1');
		document.getElementById("btnserv5").classList.remove('activegrp1');
		document.getElementById("btnserv6").classList.remove('activegrp1');
		document.getElementById("btnserv7").classList.remove('activegrp1');
		document.getElementById("btnserv8").classList.remove('activegrp1');
		document.getElementById("btnserv9").classList.add('activegrp1');
		document.getElementById("btnserv10").classList.remove('activegrp1');
	});

	$('#btnserv10').click(function()
	{
		$("#serv1").hide();
		$("#serv2").hide();
		$("#serv3").hide();
		$("#serv4").hide();
		$("#serv5").hide();
		$("#serv6").hide();
		$("#serv7").hide();
		$("#serv8").hide();
		$("#serv9").hide();
		$("#serv10").show();
		document.getElementById("btnserv1").classList.remove('activegrp1');
		document.getElementById("btnserv2").classList.remove('activegrp1');
		document.getElementById("btnserv3").classList.remove('activegrp1');
		document.getElementById("btnserv4").classList.remove('activegrp1');
		document.getElementById("btnserv5").classList.remove('activegrp1');
		document.getElementById("btnserv6").classList.remove('activegrp1');
		document.getElementById("btnserv7").classList.remove('activegrp1');
		document.getElementById("btnserv8").classList.remove('activegrp1');
		document.getElementById("btnserv9").classList.remove('activegrp1');
		document.getElementById("btnserv10").classList.add('activegrp1');
	});

) */
	function reset ()
	{
		//$(".inbox-body").hide();
		$(".temp-msg").show();
	}
});

function getReservationsList(){
	$.post('/admin/reserve_list', function(response){
		var html = "";
		response.forEach(item => {
			if(item.date == Date.today().toString("M-d-yyyy")){

			}else if(item.date == Date.parse("yesterday").toString("M-d-yyyy")){

			}
		});
	});
	//$('.mail_list_column').html();
}

//Have you ever the news that your dead?
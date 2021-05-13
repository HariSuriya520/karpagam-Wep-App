$('#bar').click(function(){
	$(this).toggleClass('open');
	$('#page-content-wrapper ,#sidebar-wrapper').toggleClass('toggled' );

});


$(document).ready(function(){
  $.ajax({
      url:"Notification.json",
      dataType: "json",
      success: function(data){
          $(data.users).each(function(index,value){
              var record="<tr><td>"+(index+1)+
              "</td><td>"+value.NAME+"</td><td>"+
              value.AGE+"</td><td>"+value.CITY+
              "</td><td>"+value.PINCODE+"</td><td>"+value.FILE+"</td></tr>";
              $("table").append(record);
          });
      }
  });
});
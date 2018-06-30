$(function() {


    window.data=[];
var rooms=[];

var a=jQuery('<datalist></datalist>')
   $.getJSON('/kki', function(data) {
  $.each(data,function(i, f) {
        // document.getElementById("new").value=f.toString();
f.forEach((roo)=>{
rooms.push(roo);
a.append(jQuery('<option></option>').text(roo));})
     });
jQuery('#rooms').html(a)
window.data=window.data.concat(rooms)
setTimeout(function(){
   window.location.reload(1);
}, 5000);
});});
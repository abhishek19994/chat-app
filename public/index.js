var socket=io();
var scroll=function(){
	var messages=jQuery('#messages')
	var clientHeight=messages.prop('clientHeight');
	var scrollTop=messages.prop('scrollTop')
	var scrollHeight=messages.prop('scrollHeight')
	var newMessageHeight=messages.children('li:last-child').innerHeight();
	var prevMessageHeight=messages.children('li:last-child').prev().innerHeight();
	if(clientHeight+scrollTop+newMessageHeight+prevMessageHeight>=scrollHeight){messages.scrollTop(scrollHeight);}
}
socket.on('connect',()=>{
	var params=jQuery.deparam(window.location.search);
socket.emit('join',params,(err)=>{
	if(err){
	alert(err);
	window.location.href='/';}
	else{
		console.log(params);
	}
}
)})
socket.on('disconnect',()=>{
console.log('disconnected from server');})
socket.on('newEmail',function(data){
	
	console.log(data);
});
socket.on('newLocationMessage',function(data){
	/*li=jQuery('<li></li>');
	li.text(data.from+' '+moment(data.createdAt).format('hh:mm a')+':');
	a=jQuery('<a target="_blank">My Current location</a>')
	a.attr('href','https://www.google.com/maps?q='+data.latitude+','+data.longitude)
	li.append(a);
	jQuery('#messages').append(li);

	console.log(data);*/
	var template=jQuery('#location-message-template').html();
	var url='https://www.google.com/maps?q='+data.latitude+','+data.longitude;
	var html=Mustache.render(template,{from:data.from,createdAt:moment(data.createdAt).format('hh:mm a'),url:url})
	jQuery('#messages').append(html)
	scroll();
})

socket.on('newMessage',function(data){
/*li=jQuery('<li></li>');
li.text(data.from+' '+moment(data.createdAt).format('hh:mm a')+' '+':'+data.text);
jQuery('#item').append(li);
	console.log('NewMessage',data);*/
var template=jQuery('#message-template').html();
var html=Mustache.render(template,{text:data.text,from:data.from,createdAt:moment(data.createdAt).format('hh:mm a')})
jQuery('#messages').append(html)
scroll();
})
/*socket.emit('createMessage',{from :'abhi', text:'hety'},function(){console.log('got it');})*/
jQuery('#message-form').on('submit',(e)=>{
	e.preventDefault();
	socket.emit('createMessage',{
		from:'User', text:jQuery('[name=name]').val()
	},function(){jQuery('[name=name]').val('')})
})
jQuery('#geo').on('click',(e)=>{
	jQuery('#geo').attr('disabled','disabled').text('Sending location..')
	if(!navigator.geolocation){return alert('Sorry try nother browser');}
	else{navigator.geolocation.getCurrentPosition((coord)=>{
		jQuery('#geo').removeAttr('disabled').text('Sendlocation');
	socket.emit('createLocationMessage',{latitude:coord.coords.latitude,longitude:coord.coords.longitude})
	
	},(e)=>{})

	}
})
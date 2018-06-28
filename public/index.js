var socket=io();

socket.on('connect',()=>{
console.log('connected to server');})
socket.on('disconnect',()=>{
console.log('disconnected from server');})
socket.on('newEmail',function(data){
	
	console.log(data);
});
socket.on('newLocationMessage',function(data){
	li=jQuery('<li></li>');
	li.text(data.from+' '+moment(data.createdAt).format('hh:mm a')+':');
	a=jQuery('<a target="_blank">My Current location</a>')
	a.attr('href','https://www.google.com/maps?q='+data.latitude+','+data.longitude)
	li.append(a);
	jQuery('#item').append(li);

	console.log(data);
})

socket.on('newMessage',function(data){
li=jQuery('<li></li>');
li.text(data.from+' '+moment(data.createdAt).format('hh:mm a')+' '+':'+data.text);
jQuery('#item').append(li);
	console.log('NewMessage',data);
})
/*socket.emit('createMessage',{from :'abhi', text:'hety'},function(){console.log('got it');})*/
jQuery('#kaki').on('submit',(e)=>{
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
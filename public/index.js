var socket=io();

socket.on('connect',()=>{
console.log('connected to server');})
socket.on('disconnect',()=>{
console.log('disconnected from server');})
socket.on('newEmail',function(data){
	
	console.log(data);
});

socket.on('newMessage',function(data){
li=jQuery('<li></li>');
li.text(data.from+':'+data.text);
jQuery('#item').append(li);
	console.log('NewMessage',data);
})
/*socket.emit('createMessage',{from :'abhi', text:'hety'},function(){console.log('got it');})*/
jQuery('#kaki').on('submit',(e)=>{
	e.preventDefault();
	socket.emit('createMessage',{
		from:'User', text:jQuery('[name=name]').val()
	},function(){})
})
/*jQuery('#geo').on('click',(e)=>{
	e.blank()
})*/
var socket=io();
socket.on('connect',()=>{
console.log('connected to server');})
socket.on('disconnect',()=>{
console.log('disconnected from server');})
socket.on('newEmail',function(data){
	console.log(data);
});
socket.emit('createEmail',{
	to:'mail',text:'kakai'
})
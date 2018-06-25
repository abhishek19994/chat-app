var express=require('express');
const path=require('path');
const http=require('http');
const SOCKETIO=require('socket.io');

var app=express();
var server=http.createServer(app);
var io=SOCKETIO(server);
app.use(express.static(path.join(__dirname,'../public')))
io.on('connection',(socket)=>{
	console.log('new user connected');
socket.on('disconnect',()=>{console.log('user disconnected');})
socket.emit('newEmail',{
	from:'kaki', to:'ku',createdAt:new Date().toString("MMM dd")
});
socket.on('createEmail',function(newdata){
	console.log(newdata);

})
})
server.listen(3000);
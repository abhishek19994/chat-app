var express=require('express');
const path=require('path');
const http=require('http');
const SOCKETIO=require('socket.io');

var {generateMessage,generateLocationMessage,isReal}=require('./message/message.js')
var app=express();
var moment=require('moment');
var server=http.createServer(app);
var io=SOCKETIO(server);
app.use(express.static(path.join(__dirname,'../public')))
	io.on('connection',(socket)=>{

		console.log('new user connected');
		
	
	socket.on('join',(params,callback)=>{
		
	if(!isReal(params.name) || !isReal(params.room)){callback('provide both of them');}
	callback();
socket.join(params.room);
socket.emit('newMessage',generateMessage('Admin','Welcome to the chat App'))
	socket.to(params.room).broadcast.emit('newMessage',	generateMessage('Admin',params.name+' has joined'))})
	socket.on('createMessage',function(Message,callback){
		console.log('create Message',Message);
		io.emit('newMessage',generateMessage(Message.from,Message.text));
		callback();
})
	socket.on('createLocationMessage',function(data){
		
		io.emit('newLocationMessage',generateLocationMessage('Admin',data.longitude,data.latitude))
	})
	socket.on('createEmail',function(newdata){
		console.log(newdata);
})
	socket.on('disconnect',()=>{console.log('user disconnected');})
	})
	/*var date=moment();
	console.log(date.valueOf());
*/
server.listen(3000,()=>{console.log('Server is up on 3000');});
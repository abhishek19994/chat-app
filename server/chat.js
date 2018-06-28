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
		
	socket.emit('newMessage',{
		from:'Admin', text:'Welcome to the chat app',createdAt:new Date().getTime()
	})
	socket.broadcast.emit('newMessage',{from:'Admin',text:'new user has joined',createdAt:new Date().getTime()})	
	socket.on('createMessage',function(Message,callback){
		console.log('create Message',Message);
		io.emit('newMessage',{

		from:Message.from,text:Message.text, createdAt: new Date().getTime()
});
		callback();
})
	socket.on('createLocationMessage',function(data){
		
		io.emit('newLocationMessage',{from:'Admin',longitude:data.longitude,latitude:data.latitude})
	})
	socket.on('createEmail',function(newdata){
		console.log(newdata);
})
	socket.on('disconnect',()=>{console.log('user disconnected');})
	})

server.listen(3000);
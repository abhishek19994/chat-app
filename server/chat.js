var express=require('express');
const path=require('path');
const http=require('http');
const SOCKETIO=require('socket.io');
const {User}=require('./user/user.js');
var users=new User();
var {generateMessage,generateLocationMessage,isReal}=require('./message/message.js')
var app=express();
var moment=require('moment');
var server=http.createServer(app);
var io=SOCKETIO(server);
app.use(express.static(path.join(__dirname,'../public')))
app.get('/kki', (req, res) => {
 
  res.send({room:users.getRoom()});
});

	io.on('connection',(socket)=>{

		console.log('new user connected');
		
	
	socket.on('join',(params,callback)=>{
		
	if(!isReal(params.name) || !isReal(params.room)){callback('provide both of them');}
	callback();
socket.join(params.room);
users.removeUser(socket.id);
users.addUser(socket.id, params.name,params.room);
io.to(params.room).emit('updateUserList',users.getList(params.room));


socket.emit('newMessage',generateMessage('Admin','Welcome to the chat App'))
	socket.to(params.room).broadcast.emit('newMessage',	generateMessage('Admin',params.name+' has joined'))})
	
	socket.on('createMessage',function(Message,callback){
		console.log('create Message',Message);
		var user=users.getUser(socket.id)
		io.to(user.room).emit('newMessage',generateMessage(user.name,Message.text));
		callback();
})
	socket.on('createLocationMessage',function(data){
		var user=users.getUser(socket.id)
		io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,data.longitude,data.latitude))
	})
	socket.on('createEmail',function(newdata){
		console.log(newdata);
})
	socket.on('disconnect',()=>{
var user=users.removeUser(socket.id);
io.to(user.room).emit('updateUserList',users.getList(user.room))
io.to(user.room).emit('newMessage',generateMessage('Admin',user.name +' has left'))

		console.log('user disconnected');})
	

	})
	/*var date=moment();
	console.log(date.valueOf());
*/

server.listen(3000,()=>{console.log('Server is up on 3000');});
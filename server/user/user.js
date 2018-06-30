
class User{
	constructor(){
		this.users=[];

	}
	addUser(id,name,room){
		var user={id,name,room};
	
		this.users.push(user);
		return user;
	}
	removeUser(id){

		var user=this.users.filter((user)=>user.id===id)[0]
	if(user){this.users=this.users.filter((user)=>user.id!==id)}
	
	return user;
	}
	getList(room){
		var users=this.users.filter((user)=>user.room===room)

		 var nameArray=users.map((user)=>user.name)
	return nameArray;
	}
	getUser(id){
		var user=this.users.filter((user)=>user.id===id)[0]

	return user;
	}
	getRoom(){
		var roomArray=[];
		var rooms=this.users.filter(function(user){
			if(!roomArray.includes(user.room)){roomArray.push(user.room);
				return user;}
		})
		return roomArray;
	}
}


module.exports={User};
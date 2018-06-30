const expect=require('expect');
const {User}=require('./user.js')

describe('user testing',()=>{
	var users;
	beforeEach(()=>{
		users=new User();
		users.users=[{id:'1',
		name:'kkai',
		room:'room1'},
		{id:'2',
		name:'kuk',
		room:'room2',
	},{
		id:'3',
		name:'abhi',
		room:'room1'
	}]
	});
	it('shold test userAdd',()=>{
		var user1=new User();
		user1.addUser('1','ak','room1');
		expect(user1.users).toEqual([{id:'1',
		name:'ak',
		room:'room1'}])
	})
	it('should test removeUser',()=>{
		var user=users.removeUser('1');
		expect(user).toEqual({id:'1',
		name:'kkai',
		room:'room1'})
		expect(users.users).toEqual([{id:'2',
		name:'kuk',
		room:'room2',
	},{
		id:'3',
		name:'abhi',
		room:'room1'
	}])
	})
	it('should test getList',()=>{
		var user2=users.getList('room1');
		expect(user2).toEqual(['kkai','abhi'])

	})
	it('should test getUser',()=>{
		expect(users.getUser('3')).toEqual({
		id:'3',
		name:'abhi',
		room:'room1'
	})
	})
	it('should test getRoom',()=>{
		console.log(users.getRoom());
	})
})
const {generateMessage,isReal}=require('./message/message.js');
const expect=require('expect');
describe('for testing message',()=>{
	it('should test',()=>{
	var m=generateMessage('abhi','hey');
	expect(m.from).toBe('abhi')
	expect(typeof m.createdAt).toBe('number')
	})
})
describe('testing issreal',()=>{
	it('should return false',()=>{
		expect(isReal('')).toBe(false)
		expect(isReal(' td ')).toBe(true)
		expect(isReal(123)).toBe(false)
	})
})
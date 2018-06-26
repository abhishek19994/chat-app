const {generateMessage}=require('./message/message.js');
const expect=require('expect');
describe('for testing message',()=>{
	it('should test',()=>{
	var m=generateMessage('abhi','hey');
	expect(m.from).toBe('abhi')
	expect(m.createdAt).toBeA('number')
	})
})
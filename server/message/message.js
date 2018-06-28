var moment=require('moment');
var generateMessage=(from,text)=>{
	return {from,text,createdAt:moment().valueOf()}
}
var generateLocationMessage=(from,longitude,latitude)=>{
	return {from,longitude,latitude,createdAt:moment().valueOf()}
}
module.exports={generateMessage,generateLocationMessage};
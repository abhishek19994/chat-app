var moment=require('moment');
var generateMessage=(from,text)=>{
	return {from,text,createdAt:moment().valueOf()}
}
var generateLocationMessage=(from,longitude,latitude)=>{
	return {from,longitude,latitude,createdAt:moment().valueOf()}
}
var isReal=(str)=>{
return typeof str==='string' && str.trim().length>0	
}
module.exports={generateMessage,generateLocationMessage,isReal};
var mongoose 					= require('mongoose'),
	passportLocalMongoose		= require('passport-local-mongoose');

var	Item 						= require('./items');


var userSchema = new mongoose.Schema({
	
	username: String,
	password: String,
	
	Full_Name: String,
	Email_Id: String,
	Shop_Name: String,
	Business_Name: String,
	Address_Line_1: String,
	Address_Line_2: String,
	City: String,
	Pin_Code: String,
	
	User_Type: String,
	Product_Category: String,
	Rider_Availability: String,
	Business_Experience: String,

	items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
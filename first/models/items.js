var mongoose		= require('mongoose');


var itemSchema = new mongoose.Schema({
	Name: String,
	Model: String,
	Category: String,
	Price: Number,
	Description: String
});


module.exports = mongoose.model('Item', itemSchema);
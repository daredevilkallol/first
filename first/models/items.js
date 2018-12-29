var mongoose		= require('mongoose');


var itemSchema = new mongoose.Schema({
	Name: String,
	Model: String,
	Category: String,
	PricePerPiece: Number,
	Quantity: Number,
	Price: Number,
	Description: String,
	Date: Date,
	User: String
});


module.exports = mongoose.model('Item', itemSchema);
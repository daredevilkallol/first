var express 					= require('express');
var router 						= express.Router();

var Item 						= require('../models/items');
var User 						= require('../models/users');
var dateTime					= require('node-datetime').create();

router.get('/new_item_form', isLoggedIn, function(require, result){
	var userName = require.user.username;
	result.render('new_item_form.ejs', {Username: userName});
});

//user should be admin
router.get('/all_items', isLoggedIn, isAdmin, function(require, result){
	
	Item.find({}, function(error, allItems)
	{
		if(error)
		{
			console.log(error);
		}
		else
		{
			console.log('Items Retrieved');
			result.render('vendor_items.ejs', {foundItems: allItems});
		}
	});
});

router.get('/vendor_items', function(require, result){
	
	User.findOne({username: require.user.username}).populate('items').exec(function(error, respectiveItems){
		if(error)
			console.log(error);
		else
		{
			console.log("Vendor's All Items Page");
			console.log(respectiveItems);
			result.render('user_items.ejs', {sentItem: respectiveItems});
		}
	});
});

router.get('/show_item/:id', isLoggedIn, function(require, result){
	
	Item.findById(require.params.id, function(error, thisItem)
	{
		if(error)
		{
			console.log(error);
		}
		else
		{	
			console.log('Item Selected');
			result.render('show_item.ejs', {sentItem: thisItem});
		}
	});
});

router.get('/update_item/:id/edit', isLoggedIn, function(require, result){
	

	Item.findById(require.params.id, function(error, thisItemForUpdate)
	{
		if(error)
		{
			console.log(error);
		}
		else
		{
			console.log('Item Selected');
			var userName = require.user.username;
			result.render('update_item.ejs', {sentItemForUpdate: thisItemForUpdate, Username: userName});
		}
	});
});

router.post('/new_item_form', function(require, result){
	var iname = require.body.item_name;
	var imodel = require.body.item_model;
	var icategory = require.body.item_category;
	var ipriceperpiece = require.body.item_price_per_piece;
	var iquantity = require.body.item_quantity;
	var iprice = require.body.item_price;
	var idescription = require.body.item_description;
	var iuser = require.body.item_user;

	dateTime.format('d/m/y H:M:S');
	var idate = new Date(dateTime.now());

	
var newItem = {

	Name: iname,
	Model: imodel,
	Category: icategory,
	PricePerPiece: ipriceperpiece,
	Quantity: iquantity,
	Price: iprice,
	Description: idescription,
	User: iuser,
	Date: idate
};

	//push items to user-items
	Item.create(newItem, function(error, newlyCreatedItem)
	{
		if(error)
		{
			console.log(error);
		}
		else
		{
			console.log('Item Created');
			console.log(newlyCreatedItem);
			User.findOne({username: require.user.username}, function(err, foundUser){
				if(err)
					console.log(err);
				else
				{
					console.log('Item Created and User Found');
					console.log(foundUser);
					foundUser.items.push(newlyCreatedItem);
					foundUser.save(function(eRROR, data){
						if(eRROR)
							console.log(eRROR);
						else
						{
							console.log('Item Pushed saveSuccessfully');
							console.log(data);
							result.redirect('/'+require.user.username);
						}
					});
				}
			});
		}
	});
});

router.put('/show_item/:id', function(require, result){
	
	var iname = require.body.item_name;
	var imodel = require.body.item_model;
	var icategory = require.body.item_category;
	var ipriceperpiece = require.body.item_price_per_piece;
	var iquantity = require.body.item_quantity;
	var iprice = require.body.item_price;
	var idescription = require.body.item_description;
	var iuser = require.body.item_user;
	
	dateTime.format('d/m/y H:M:S');
	var idateNew = new Date(dateTime.now());
	
	var editItem = {
	
		Name: iname,
		Model: imodel,
		Category: icategory,
		PricePerPiece: ipriceperpiece,
		Quantity: iquantity,
		Price: iprice,
		Description: idescription,
		User: iuser,
		Date: idateNew
	
	};

	Item.findByIdAndUpdate(require.params.id, editItem, function(error, updatedItem){
		
		if(error)
		{
			console.log(error);
		}
		else
		{
			console.log('Item Updated');
			console.log(updatedItem);
			result.redirect('/show_item/' + require.params.id);
		}
		
	});
});

router.delete('/show_item/:id', function(require, result){
	
	Item.findByIdAndRemove(require.params.id, function(error){
		
		if(error)
		{
			console.log(error);
		}
		else
		{
			console.log('Item Deleted');
			result.redirect('/vendor_items');
		}
		
	});
});



function isLoggedIn(require, result, next){
	if(require.isAuthenticated())
	{
		return next();
	}
	else
	{
		result.redirect('/sign_in');
	}
}

function isAdmin(require, result, next){
	if(require.user.username=="admin")
	{
		return next();
	}
	else
	{
		result.redirect("/vendor_items");
	}

}

module.exports = router;
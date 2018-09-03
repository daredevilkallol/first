var express 					= require('express'),
	router 						= express.Router();
	
var	passport 					= require('passport');

/*
var	passportLocal				= require('passport-local').Strategy,
	passportLocalMongoose		= require('passport-local-mongoose'),
	expressSession 				= require('express-session');
*/

var User 						= require('../models/users');


router.get('/sign_up', function(require, result){
	console.log('Sign Up Required');
	result.render('sign_up.ejs');
});

router.get('/sign_in', function(require, result){
	console.log('Sign In Required');
	result.render('sign_in.ejs');
});

router.get('/user_profile', isLoggedIn, function(require, result){
	User.findById(require.user.id, function(error, thisUser)
	{
		if(error)
		{
			console.log(error);
		}
		else
		{
			console.log('User Profile');
			result.render('profile.ejs', {sentUser: thisUser});
		}
	});
});

router.get('/sign_out', function(require, result){
	require.logout();
	console.log('Signed Out');
	result.redirect('/');
});




router.post('/sign_up', function(require, result){
	
	var userName = require.body.username;
	var passWord = require.body.password;
	

	//username in following line is register function requirement.....
	User.register(new User({username: userName}), passWord, function(error, registeredUser){
		if(error)
		{
			console.log('Registration Error')
			console.log(error);
			result.redirect('/sign_up');
		}
		else
		{
			//following calls passport serialize and deserialize methods also to maintain the session info
			passport.authenticate("local")(require, result, function(){
				/*if(err)
				{
					console.log('Authentication Error');
					console.log(err);
				}
				else
				{
					console.log(registeredAndAuthenticatedUser);
					res.redirect('/');
				}*/
				console.log('Signed Up And Signed In');
				result.redirect('/'+userName);
			});
		}
	});
});

//router.post('/sign_in', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/sign_in' }), function(require, result){});

router.post('/sign_in', passport.authenticate('local', { failureRedirect: '/sign_in' }), function(require, result){
	var username = require.user.username;

	result.redirect('/'+username);
});

function isLoggedIn(require, result, next){
	if(require.isAuthenticated())
	{
		console.log('User is Logged In');
		return next();
	}
	else
	{
		result.redirect('/sign_in');
	}
}

router.post('/sign_up', function(require, result){
	
	var userName = require.body.username;
	var passWord = require.body.password;
	

	//username in following line is register function requirement.....
	User.register(new User({username: userName}), passWord, function(error, registeredUser){
		if(error)
		{
			console.log('Registration Error')
			console.log(error);
			result.redirect('/sign_up');
		}
		else
		{
			//following calls passport serialize and deserialize methods also to maintain the session info
			passport.authenticate("local")(require, result, function(){
				/*if(err)
				{
					console.log('Authentication Error');
					console.log(err);
				}
				else
				{
					console.log(registeredAndAuthenticatedUser);
					res.redirect('/');
				}*/
				console.log('Signed Up And Signed In');
				result.redirect('/'+userName);
			});
		}
	});
});

router.get('/profile/:id/edit', isLoggedIn, function(require, result){
	

	User.findById(require.user.id, function(error, profileToBeUpdated)
	{
		if(error)
		{
			console.log(error);
			result.redirect('/'+require.user.username);
		}
		else
		{
			console.log('User Selected for Update');
			result.render('update_profile.ejs', {sentUserForUpdate: profileToBeUpdated});
		}
	});
});

router.put('/profile/:id', function(require, result){
	
	var iusername 				= require.body.username;
	var ifull_name 				= require.body.full_name;
	var iemail_id 				= require.body.email_id;
	var ishop_name 				= require.body.shop_name;
	var ibusiness_name 			= require.body.business_name;
	var iaddress_1 				= require.body.address_1;
	var iaddress_2 				= require.body.address_2;
	var icity 					= require.body.city;
	var ipin_code				= require.body.pin_code;
	var iuser_type 				= require.body.user_type;
	var irider_availability 	= require.body.rider_availability;
	var ibusiness_experience 	= require.body.business_experience;
	

	/*var iproduct_category = require.body.product_category;
	
	
*/	
	var editUser = {
		
		username: 				iusername,
		Full_Name: 				ifull_name,
		Email_Id: 				iemail_id,
		Shop_Name: 				ishop_name,
		Business_Name: 			ibusiness_name,
		Address_Line_1: 		iaddress_1,
		Address_Line_2: 		iaddress_2,
		City: 					icity,
		Pin_Code: 				ipin_code,
		User_Type: 				iuser_type,
		Rider_Availability: 	irider_availability,
		Business_Experience: 	ibusiness_experience,

		/*Product_Category: iproduct_category,
		
*/
	
	};

	User.findByIdAndUpdate(require.user.id, editUser, function(error, updatedUser){
		
		if(error)
		{
			console.log(error);
		}
		else
		{
			console.log('User Updated');
			console.log(updatedUser);
			result.redirect('/user_profile');
		}
		
	});
});



module.exports = router;
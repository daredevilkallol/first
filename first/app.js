//==============================================
//					Questions
//==============================================

//# why isn't locals function working on sign_in post method?
//# working of middleware?

var express 					= require('express'),
	app 						= express(),
	path 						= require('path'),
	mongoose 					= require('mongoose'),
	bodyParser					= require('body-parser'),
	methodOverride 				= require('method-override'),
	
	passport 					= require('passport'),
	passportLocal				= require('passport-local').Strategy,
	passportLocalMongoose		= require('passport-local-mongoose'),
	expressSession 				= require('express-session'),

	Item 						= require('./models/items'),
	User 						= require('./models/users'),
	
	itemRoutes					= require('./routes/items'),
	userRoutes					= require('./routes/users');


//==============================================
//					App Setup
//==============================================

app.use(express.static(path.join(__dirname, 'assets'))); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/first");

app.use(expressSession({
	secret: 'Fuck You...Yeah Man...You and Only You',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(require, resend, next){
	resend.locals.currentUser = require.user;
	next();
});

/*app.use(function(require, resend, next){
	resend.locals.currentUsername = require.user.username;
	next();
});
*/


//==============================================
//					Routes
//==============================================



app.use(itemRoutes);
app.use(userRoutes);

app.get('/', function(require, result){
	result.redirect('/sign_in');
});

app.get('/:username', isLoggedIn, function(require, result){
	console.log('*******************************' + require.user.username + '*******************************');
	console.log(require.user);
	result.render("Home.ejs", {currentUser: require.user});
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


app.listen('3000', function(){
	console.log('Sever Request on Port 3000');
});
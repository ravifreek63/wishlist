
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var john_test = require('./routes/john_test');
var http = require('http');
var path = require('path');
var data = require('./routes/data');
var app = express();
var ownWishList = require('./routes/ownWishList');
var accounts = require('./routes/accounts');
var ownFriendList = require('./routes/ownFriendList');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/* Dummy routes. */
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/john_test', john_test.john_test_handler);
app.get('/list_names', john_test.list_names_handler);
app.get('/get_user', data.dataHandler);
app.get('/remove_user', john_test.remove_user_handler);
/* Wish list routes. */
app.post('/user/:userId/items/add', ownWishList.addItems); // add items to own wish list , single item 
app.get('/user/:userId/items/get', ownWishList.getItems);  // get all the items , bulk query 
app.post('/user/:userId/items/edit', ownWishList.editItems); // edit an item in the wishlist 
app.post('/user/:userId/items/remove', ownWishList.removeItems); // remove an item from the wishlist , bulk query
/* Friend list routes. */
app.get('/user/:userId/friend_list', ownFriendList.friend_list_view); // view all the friends of the user
app.get('/user/:userId/friends/get', ownFriendList.getFriends); // get a list of all the friends of the user
app.post('/user/:userId/friends/add', ownFriendList.addFriend); // add a friend
app.post('/user/:userId/friends/remove', ownFriendList.removeFriend); // remove a friend
app.post('/user/:userId/friends/invite', ownFriendList.inviteFriend); // invite a friend
app.post('/user/:userId/friends/edit', ownFriendList.editFriend); // edit a friend
/* Login/signup routes. */
app.post('/signUp', accounts.createAccount); // Signup for the user 
app.post('/signIn', accounts.signIn); // login for the user

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

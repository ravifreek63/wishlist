
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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/john_test', john_test.john_test_handler);
app.get('/list_names', john_test.list_names_handler);
app.get('/get_user', data.dataHandler);
app.get('/remove_user', john_test.remove_user_handler);
app.post('/user/:userId/items/add', ownWishList.addItems); // add items to own wish list , single item 
app.get('/user/:userId/items/get', ownWishList.getItems);  // get all the items , bulk query 
app.post('/user/:userId/items/edit', ownWishList.editItems); // edit an item in the wishlist 
app.post('/user/:userId/items/remove', ownWishList.removeItems); // remove an item from the wishlist , bulk query


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

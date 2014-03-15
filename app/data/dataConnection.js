var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  database   : 'WishListDB', 
  user     : 'root',
  password : 'toot'
});
exports.connection = connection;


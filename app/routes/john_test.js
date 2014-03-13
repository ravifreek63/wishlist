
/*
 * GET a test page by John.
 */

exports.john_test_handler = function(req, res){
  res.render('john_test', { title: 'John\'s first test page' });
};



var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  database   : 'mydb', 
  user     : 'root',
  password : 'toot'
});


exports.list_names_handler = function(req, res){
    connection.connect();
    connection.query('SELECT * FROM User', function(err, rows, fields) {
	    if (err) throw err;

	    res.render('list_names', {
		    title: 'A list of names', 
		    UserRows: rows
		});
	});
    connection.end();
};

exports.remove_user_handler = function(req, res){
    connection.connect();
    
    connection.query('SELECT * FROM User WHERE name=\''+, function(err, rows, fields) {
	    if (err) throw err;

	    res.render('list_names', {
		    title: 'A list of names', 
		    UserRows: rows
		});
	});
    connection.end();
};




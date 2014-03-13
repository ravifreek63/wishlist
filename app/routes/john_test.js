
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
    
    connection.query('SELECT * FROM User WHERE name=\''+req.name+'\'', function(err, rows, fields) {
	    if (err) throw err;

	    /* Check to see if one user was found. */
	    if (rows.length==1)
		{
		    /* Remove the user. */
		    
		}
	    else
		{
		    /* Send a failure response. */
		    res.send(200,{
			    misc: {
				action: "remove",
				status: "failed",
				msg: "No user found."    
				   }
			});
		}
	});
    connection.end();
};




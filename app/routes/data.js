var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  database   : 'mydb', 
  user     : 'root',
  password : 'toot'
});

exports.dataHandler = function (req, res){
connection.connect();
connection.query('SELECT * FROM User', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].name);
  res.send (rows);
//  connection.end();
});
  connection.end();
};

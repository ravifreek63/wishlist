var methods = require('../helperMethods/methods.js');
var gV = require('../globals/globalVariables.js');
var string = require('string');
var connection = require('../data/dataConnection.js').connection;
/*
 header: Content-type: application/json

 {
 "userObj": {
 "name": "ravi",
 "emailId": "abc@abc.com",
 "password": "abc"
 }
 }
*/
exports.createAccount = function createAccount (req, res){
    var name = req.body.name;
    var emailId = string(req.body.emailId).toString().trim();
    var password = req.body.password;
    var activated = 1;
    var type = 2; // Normal User is 2, Admin is type 1
    var resMsg = "Successful Creation of User Account";
    var resMsgErr = "Error in User Account Creation";
    var sendResponse = function (err, obj) {
        res.send(JSON.stringify({
            error: err,
            response: obj
        }));
    };
    var checkAccountQuery = "SELECT * from Account_Details where EmailId='" + emailId + "';";// Check if an account exists with this
    methods.logQuery("checkAccountQuery:" + checkAccountQuery);
    function checkAccountHandler (err, rows){
        if (err == undefined) {
            var wishListId = methods.generateUUID ();// Generating an empty wishlist for this user
            var query = "";
            if (rows.length  == 0)
                var userId = methods.generateUUID(); // Check for duplicate UUID
            else
                var userId = rows[0].UserId;
            methods.generateWishList(wishListId, userId, function (err) {
                if (err == undefined) {
                    if (rows.length == 0) { // create an account
                        var fields = {UserId: userId, Password: password, Type: type, EmailId: emailId,
                            Name: name, Activated: activated};
                        query = methods.queryBuilder(gV.tableNames.Account_Details,
                            fields, gV.queryTypes.INSERT);
                        methods.logQuery ("accountCreationQuery:" + query);
                    } else if (rows[0].Activated == 0){
                        query = "Update Account_Details set Password = '" + password + "',Activated = '1'" +
                            " Where EmailId = '" +  emailId + "';";
                        methods.logQuery ("updateAccountOnCreation:" + query);
                    }
                        connection.query(query, function (err) {
                            if (err == undefined) {
                                req.session.userId = userId;
                                methods.createResponse(gV.success.code, resMsg,
                                    gV.success.status, {userId: userId}, sendResponse);
                            } else {
                                methods.createResponse(gV.failure.code, "Account Creation Failed",
                                    gV.failure.status, {}, sendResponse);
                            }
                        });
                    } else {
                    methods.createResponse(gV.failure.code, resMsgErr,
                        gV.failure.status, {}, sendResponse);
                }
            });
        }
        else {
            methods.queryError(checkAccountQuery, err);
            methods.createResponse(gV.failure.code, resMsgErr,
                gV.failure.status, {}, sendResponse);
        }
    }
    connection.query(checkAccountQuery, checkAccountHandler);

};

exports.signIn = function signIn (req, res){
    var emailId = string(req.body.emailId).toString().trim();
    var password = req.body.password;
    var query = "SELECT * FROM Account_Details where emailId = '" + emailId + "';";
    connection.query (query, function(err, rows, fields){
	    if (err == undefined){
		if (rows && rows.length > 0){
		    if (password == rows[0].Password){
                req.session.userId = rows[0].UserId;
                    methods.createResponse (gV.success.code, "Login Successful",
						gV.success.status, {userId: rows[0].UserId}, sendResponse);
		    } else {
			methods.createResponse(gV.failure.code, "Login Failed, Password did not match", 
					       gV.failure.status, {}, sendResponse);
		    }
		} else {
		    console.log ("Account Does Not Exist, EmailId" + emailId);
		    methods.createResponse (gV.success.code, "Account Does Not Exist",
					    gV.otherStatus.accountNonExistent, {}, sendResponse);
		}			
	    } else {
		console.log ("Error in getting account details, error:" + err + ", query:" + query);
		res.send (JSON.stringify({error: err}));
	    }
    });
var sendResponse = function (err, obj){
     res.send (JSON.stringify({
		    error: err,
		    response :obj
     }));
};
};

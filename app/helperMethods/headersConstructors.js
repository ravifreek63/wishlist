var gV = require('../globals/globalVariables.js');
var string = require ('string');
var _ = require('underscore');
var function = createResponse (code, message, status, miscellaneous, callback){
    var responseObject = {
	'code' : code, 
	'message' : message,
	'status' : status, 
	'miscellaneous' : miscellaneous
    };
    if (callback){
	if (code == gV.success.code)
	    callback ({}, responseObject);
	else 
	    callback({error: miscellaneous.error}, responseObject);
    } else {
	console.log('In function createResponse, callback passed as empty');
    }
};
exports.createResponse = createResponse;

var function = arToStringArray (array){
    return string((_.map([1, 2, 3], function(num){ return "'" + num + "'"}))).toString();
};

exports.arToStringArray = arToStringArray;
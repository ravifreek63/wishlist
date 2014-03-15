var gV = require('../globals/globalVariables.js');
var string = require ('string');
var _ = require('underscore');
var uuid = require('node-uuid');

var createResponse = function createResponse (code, message, status, miscellaneous, callback){
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

var arToStringArray = function arToStringArray (array){
    console.log (array[0]);
    return string((_.map(array, function(num){ return "'" + num + "'"}))).toString();
};

exports.arToStringArray = arToStringArray;

var generateUUID = function generateUUID (){
    return uuid.v4();
};

exports.generateUUID = generateUUID;
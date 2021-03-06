/*This file contains all the API handlers for the owner's actions on his own wish list. */
var connection = require('../data/dataConnection.js').connection;
var methods = require('../helperMethods/methods.js');
var gV = require('../globals/globalVariables.js');
var fs = require('fs');


/*
 {
 "itemId": "f61827d6-2a21-44ec-8a32-49925e2758e4",
 "description": "abc"
 }
*/
// TODO If itemId does not exist populate the item Id also 
exports.addItems = function (req, res){
    var itemName = req.body.itemName;
    var preferredBrand = req.body.preferredBrand;
    var approximatePrice = req.body.approximatePrice;
    var description = req.body.description;
    var imageId = req.body.imageId;
    var imageName='';
    var userId = req.params.userId;
    var resMsg = "added items successfully";
    var resMsgErr = "Error in adding items";

    var wishId = methods.generateUUID (); // Check if the UUID already exists or not
    var itemId ; //= methods.generateUUID (); // Need to get the item id from the item name
    var query_imageName="SELECT * from Image_Store where ImageId='"+imageId+"';"
    var query1 = "SELECT * from Item_Details Where ItemName Like '%" + itemName + "%' AND " +
        "Brand Like '%"+preferredBrand+"%';";
    console.log (query1);

    function queryHandler1(errQ1, rowsQ1){
        if (errQ1 == undefined){
            console.log(rowsQ1.length);
            if (rowsQ1.length == 0){
                // generate the
                itemId = methods.generateUUID();
                var query3 = "INSERT INTO Item_Details (ItemId, ItemName, Brand) VALUES ('"+ itemId +"','" + itemName +
                    "','"+ preferredBrand +"');";
                function query3Handler (errQ3, rowsQ3){
                    if (errQ3 == undefined){
                        methods.getWishListId (userId, function(err, obj){
                            if (err == undefined){
                                var wishListId = obj.wishListId;
                                var query = "Insert Into Wish_WishList (WishListId, WishId, ItemId, UserId, Description, " +
                                    "PreferredBrand, ApproxPrice, ImageId, ImageName) Values ('" +
                                    wishListId + "','" + wishId + "','" + itemId +  "','" +  userId + "','" + description +
                                    "','" + preferredBrand + "','" + approximatePrice + "','" + imageId + "','"+ imageName+"');";
                                console.log (query);
                                methods.runQuery(resMsg, resMsgErr, query, res);
                            } else {
                                console.log ("Error in getting wishListId, error:" + err.msg);
                                res.send (err);
                            }
                        });
                    } else {
                        console.log ("Err:" + errQ3 + ", Query:" + query3);
                        res.send(errQ3);
                    }
                }
                connection.query(query3, query3Handler);
            } else {
                itemId = rowsQ1[0].ItemId;
                methods.getWishListId (userId, function(err, obj){
                    if (err == undefined){
                        var wishListId = obj.wishListId;
                                var query = "Insert Into Wish_WishList (WishListId, WishId, ItemId, UserId, Description, " +
                                    "PreferredBrand, ApproxPrice, ImageId, ImageName) Values ('" +
                                    wishListId + "','" + wishId + "','" + itemId +  "','" +  userId + "','" + description +
                                    "','" + preferredBrand + "','" + approximatePrice + "','" + imageId + "','"+ imageName+"');";
                        console.log (query);
                        methods.runQuery(resMsg, resMsgErr, query, res);
                    } else {
                        console.log ("Error in getting wishListId, error:" + err.msg);
                        res.send (err);
                    }
                });
            }
        } else {
            console.log ("error:" + errQ1 + "query:" + query1);
            res.send(errQ1);
        }
    }
    function query_imageNameH(err, rows){
        if (err == undefined){
            if (rows.length > 0){
             imageName = rows[0].ImageName; 
            } 
            connection.query(query1, queryHandler1);
        } else {
            console.log('err:' + err + 'query:' + query_imageName);
            res.send(err);
        }
    }
    methods.logQuery(query_imageName);
    connection.query(query_imageName, query_imageNameH);
};

exports.getItems = function (req, res){
    var userId = req.params.userId;
    var query = "SELECT * FROM Wish_WishList As W JOIN Item_Details As I ON I.ItemId = W.ItemId WHERE UserId = '" + userId + "';";
    console.log ("In function getItems, query:" + query);
    var resMsg = "Get Items query successful";
    var resMsgErr = "Get Items query failed";
    methods.runQuery (resMsg, resMsgErr, query, res);
};



exports.getItemsFriend = function (req, res){
    var userId = req.params.friendId;
    var query = "SELECT * FROM Wish_WishList As W JOIN Item_Details As I ON I.ItemId = W.ItemId WHERE UserId = '" +
        userId + "';";
    console.log ("In function getItems, query:" + query);
    var resMsg = "Get Items query successful";
    var resMsgErr = "Get Items query failed";
    methods.runQuery (resMsg, resMsgErr, query, res);
};

exports.getItemsFriendRes = function (req, res){
    var userId = req.params.friendId;
    var userIdOwn = req.params.userId;
    var query = "SELECT * FROM Wish_WishList As W JOIN Item_Details As I ON I.ItemId = W.ItemId WHERE UserId = '" +
        userId + "' AND W.IsReserved = '1' AND W.ReservedBy = '"+ userIdOwn +"';";
    console.log ("In function getItems, query:" + query);
    var resMsg = "Get Items query successful";
    var resMsgErr = "Get Items query failed";
    methods.runQuery (resMsg, resMsgErr, query, res);
};



/*
  Expects 
*/

exports.removeItems = function (req, res){
    var userId = req.params.userId;
    console.log (req.body.items);
    var items = (req.body.items);
    var query = "DELETE FROM Wish_WishList where WishId IN (" + methods.arToStringArray (items) + ") AND UserID = '" + userId + "';";
    var resMsg = "Deleted Items successfully";
    var resMsgErr = "Error in deleting Items";
    methods.runQuery (resMsg, resMsgErr, query, res);
};

/*
   Expects an itemObject JSON
   body : {
     itemObj : {
        itemId : abc, 
	userId : usId,
	brand  : brand, 
	ApproxPrice  : price,
        IsReserved : IsReserved,
        IsAcquired : IsAcquired,
        ReservedBy : , 
        AcquiredBy : ,
	Description :
     }
*/
exports.editItems = function (req, res){
    var userId = req.params.userId;
    var itemObj = req.body.itemObj;
    var itemId = itemObj.itemId;
    var approxPrice = itemObj.ApproxPrice;
    var description = itemObj.Description;
    var query = "UPDATE Item_Details SET Price = '" + itemObj.ApproxPrice +"',ItemDescription = '" + itemObj.Description + "' WHERE ItemId = '" + itemId + "';";
    methods.runQuery ("Items updated successfully", "Error in updating item" , query, res);
};

exports.uploadFile = function(req, res){
    var userId = req.params.userId;
    var imageId = methods.generateUUID ();
    var originalFileName = "p_" + new Date().getTime() + "_"+ req.files.userPhoto.originalFilename;
    var filePath = __dirname + "/../public/uploads/" + originalFileName;
    var resMsgErr = "Error in file upload";
    function resCb (error, resObj){
        res.send (JSON.stringify({error: error, response :resObj}));
    }
    var fields = {
        ImageId: imageId,
        ImageName: originalFileName,
        UserId: userId
    };
    var imageQ = methods.queryBuilder(gV.tableNames.Image_Store,fields , gV.queryTypes.INSERT);
    function imageQH(err){
        if (err == undefined){
            fs.readFile(req.files.userPhoto.path, function (err, data) {
                fs.writeFile(filePath, data, function (err) {
                    if(err == undefined) {
                        methods.createResponse (gV.success.code, "upload successful", gV.success.status, {
                            ImageId: imageId,
                            path: "/uploads/"+originalFileName
                        }, resCb);
                    } else {
                        console.log ("Error in file upload:"+ err);
                        methods.createResponse (gV.failure.code, resMsgErr, gV.failure.status, {error: err},  resCb);
                    }
                });
            });
        } else {
            methods.queryError(imageQ, err);
            methods.createResponse (gV.failure.code, resMsgErr, gV.failure.status, {error: err},  resCb);
        }
    }
    connection.query(imageQ, imageQH);
};

exports.getFile = function (req, res){
    var userId = req.params.userId;
    var imageId = req.params.imageId;
    var checkPQ = "SELECT * from Image_Store where ImageId = '" + imageId + "';";
    methods.logQuery(checkPQ);
    function checkPQH(err, rows){
        if (err == undefined){
            if (rows.length > 0) {
                var filePath = "/uploads/" + rows[0].ImageName;
                res.send ({
                    path: filePath
                });
                console.log ("here");
            } else {
                console.log ("Image not found, Id:" + imageId);
                res.send({path:""});
            }
        } else {
            res.send (err);
        }
    }
    connection.query(checkPQ, checkPQH);
};

exports.getPath = function (req, res){
    console.log ("in getPath");
    var wishId = req.params.wishId;
    console.log("wishId:" + wishId);
    var imagePath = "";
    var imageId = '';
    var getImageIdQ = "SELECT * from Wish_WishList where WishId='"+wishId+"';";    
    function getImageIdQH(err, rows){
        if (err == undefined){            
            if (rows.length > 0){
            imageId = rows[0].ImageId;
            var getImagePathQ = "SELECT * from Image_Store where ImageId='"+imageId+"';"
            function getImagePathQH(err_ip, rows_ip){
                if (err_ip == undefined){
                    if(rows_ip.length > 0){
                        imagePath = rows_ip[0].ImageName;
                    }  
                        res.send ({
                        path: imagePath
                        });                    
                } else {
                    printf("err: " + err_ip + ", in getting image path, query:" + getImagePathQ);
                    res.send (err_ip);                    
                }
            }
            methods.logQuery(getImagePathQ);
            connection.query(getImagePathQ, getImagePathQH);
        }
        } else {
            console.log ("err:" + err + ", while running query: " + getImageIdQ);
            res.send (err);
        }
    }
    methods.logQuery(getImageIdQ);
    connection.query(getImageIdQ, getImageIdQH);
}



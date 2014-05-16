exports.success = {
    code : 200,
    status : "success"
};

exports.failure = {
    code : 400, 
    status: "failure"
};

exports.otherStatus = {
    accountNonExistent : "account_non_existent"
};

var queryTypes = {
    INSERT: 0,
    SELECT: 1,
    UPDATE: 2,
    DELETE: 3
};
exports.queryTypes = queryTypes;

var tableNames = {
    Relationships: "Group_Relationships",
    Account_Details: "Account_Details",
    Image_Store: "Image_Store"
};
exports.tableNames = tableNames;
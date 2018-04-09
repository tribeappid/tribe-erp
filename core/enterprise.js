/*
 * Core Enterprise API Mongo
 *
 * Copyright 2017 Tribe App Indonesia
 * 
 * Author Hendra
 *
 * Version 1.0.0
 *
 * Change Log
 * ----------
 *
 */


// Generic get method for enterprise
// Authorized - Admin, System Admin
var getEnterprise = exports.getEnterprise = function(req, res, override, callback, apiOptions){
    var enterpriseId = null;
    var entityId = null;

    if (req.query.Enterprise) enterpriseId = req.query.Enterprise;

    authorizationHelper.authorize(req, res, [ __ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], entityId, enterpriseId, override, function(authorized){
        if (authorized) {
            var totalSizeCount = null;
            var pageSize = null;
            var skipSize = null;

            var queryParms = {};

            //key parameters
            if (req.query.Enterprise) queryParms._id = req.query.Enterprise;

            //paging parameters
            if (req.query.PageSize && !isNaN(req.query.PageSize)) pageSize = parseInt(req.query.PageSize);
            if (req.query.TotalSizeCount) totalSizeCount = req.query.TotalSizeCount;
            if (req.query.PageSize && !isNaN(req.query.SkipSize)) skipSize = parseInt(req.query.SkipSize);

            //additional options
            var options = {};
            if (apiOptions){
                options = apiOptions;
            }
            //sort options
            var sort = {};
            if (options.sort) sort = options.sort;

            //field selection option
            var enterpriseFields = {};
            var branchFields = {};

            enterpriseFields.__v = 0;
            branchFields.__v = 0;

            if (options.enterpriseFields) enterpriseFields = options.enterpriseFields;
            if (options.branchFields) branchFields = options.branchFields;

            //prior to the query parms, users extend parameters
            if (options.queryParms) _.extend(queryParms, options.queryParms);

            mongoose.model('enterprise')
                .find(queryParms)
                .select(enterpriseFields)
                .skip(skipSize)
                .limit(pageSize)
                .sort(sort)
                .lean()
                //.populate('branches', branchFields)
                .exec(function (err, data) {
                    if (totalSizeCount){
                        mongoose.model('enterprise').find(queryParms).count().exec(function(err, count){
                            apiHelper.getRes(req, res, err, data, count,callback);
                        })
                    }else{
                        apiHelper.getRes(req, res, err, data, null, callback);
                    }                    
                });
        } else {
            apiHelper.apiResponse(req, res, true, 401, "Not found", null, null, null, callback);
        }
    });
};

// Generic add method for enterprise
// Authorized - Admin, System Admin
var addEnterprise = exports.addEnterprise = function(req, res, override, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.body.Name
            ) {
                var addParms = {};

                //default values
                addParms._id = idGenHelper.generateId();
                addParms.create_date = dateTimeHelper.utcNow();
                addParms.last_update = dateTimeHelper.utcNow();

                //parameter values
                if (req.body.EnterpriseId) addParms._id = req.body.EnterpriseId;
                if (req.body.Name) addParms.name = req.body.Name;
                if (req.body.CreateDate) addParms.create_date = req.body.CreateDate;
                if (req.body.LastUpdate) addParms.last_update = req.body.LastUpdate;
                if (req.body.Description) addParms.description = req.body.Description;

                console.log(req.body);
                var newEnterpriseObj = null;
                var newEnterpriseId = null;
                var enterpriseModel =  mongoose.model('enterprise');

                async.waterfall([
                    function(addEnterpriseCallback){
                        //add the entity
                        var newEntity = new enterpriseModel(addParms);
                        //add the new entity
                        newEntity.save(function (err, data) {
                            if (!err && data){
                                newEnterpriseObj = data;
                                newEnterpriseId = data._id;
                                console.log(newEnterpriseObj);
                                addEnterpriseCallback();
                            }else{
                                addEnterpriseCallback(err);
                            }
                        });
                    }
                ], function (err) {
                    if (err){
                        apiHelper.addRes(req, res, err, null, null);
                    }else{
                        apiHelper.addRes(req, res, null, newEnterpriseObj, null);
                    }
                });
            } else {
                apiHelper.apiResponse(req, res, true, 500, "Not found", null, null, null, null);
            }
        } else {
            apiHelper.apiResponse(req, res, true, 401, "Not found", null, null, null, null);
        }
    //});
};

// Generic get method for enterprise
// Authorized - Admin, System Admin
var getBranch = exports.getBranch = function(req, res, override, callback, apiOptions){
    var enterpriseId = null;
    var entityId = null;

    if (req.query.EnterpriseId || req.query.BranchId) 
    {
        enterpriseId = req.query.EnterpriseId;
        authorizationHelper.authorize(req, res, [ __ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], entityId, enterpriseId, override, function(authorized){
            if (1 || authorized) {
                var totalSizeCount = null;
                var pageSize = null;
                var skipSize = null;
    
                var queryParms = {};
    
                //key parameters
                if (req.query.EnterpriseId) queryParms.enterprise = req.query.EnterpriseId;
                if (req.query.BranchId) queryParms._id = req.query.BranchId;
    
                //paging parameters
                if (req.query.PageSize && !isNaN(req.query.PageSize)) pageSize = parseInt(req.query.PageSize);
                if (req.query.TotalSizeCount) totalSizeCount = req.query.TotalSizeCount;
                if (req.query.PageSize && !isNaN(req.query.SkipSize)) skipSize = parseInt(req.query.SkipSize);
    
                //additional options
                var options = {};
                if (apiOptions){
                    options = apiOptions;
                }
                //sort options
                var sort = {};
                if (options.sort) sort = options.sort;
    
                //field selection option
                var branchFields = {};
    
                branchFields.__v = 0;
    
                if (options.branchFields) branchFields = options.branchFields;
    
                //prior to the query parms, users extend parameters
                if (options.queryParms) _.extend(queryParms, options.queryParms);
    
                mongoose.model('branch')
                    .find(queryParms)
                    .select(branchFields)
                    .skip(skipSize)
                    .limit(pageSize)
                    .sort(sort)
                    .lean()
                    //.populate('branches', branchFields)
                    .exec(function (err, data) {
                        if (totalSizeCount){
                            mongoose.model('branch').find(queryParms).count().exec(function(err, count){
                                apiHelper.getRes(req, res, err, data, count,callback);
                            })
                        }else{
                            apiHelper.getRes(req, res, err, data, null, callback);
                        }                    
                    });
            } else {
                apiHelper.apiResponse(req, res, true, 401, "No Authorized", null, null, null, callback);
            }
        });        
    }
    else
    {
        apiHelper.apiResponse(req, res, true, 500, "Missing Parameter", null, null, null, null);
    }
};

// Generic add method for enterprise
// Authorized - Admin, System Admin
var addBranch = exports.addBranch = function(req, res, override, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.body.Name
            ) {
                var addParms = {};

                //default values
                addParms._id = idGenHelper.generateId();
                addParms.create_date = dateTimeHelper.utcNow();
                addParms.last_update = dateTimeHelper.utcNow();

                //parameter values
                if (req.body.BranchId) addParms._id = req.body.BranchId;
                if (req.body.EnterpriseId) { 
                    addParms.enterprise = req.body.EnterpriseId;
                }
                else
                {
                    addParms.enterprise = '43GSMTI3-5KBX0YYP-EQNZ4DSZ';
                }
                if (req.body.Name) addParms.name = req.body.Name;
                if (req.body.CreateDate) addParms.create_date = req.body.CreateDate;
                if (req.body.LastUpdate) addParms.last_update = req.body.LastUpdate;
                if (req.body.Description) addParms.description = req.body.Description;
                if (req.body.Address) addParms.address = req.body.Address;
                if (req.body.Phone) addParms.phone = req.body.Phone;

                console.log(req.body);
                var newBranchObj = null;
                var newBranchId = null;
                var enterpriseObj = null;
                var enterpriseModel =  mongoose.model('enterprise');
                var branchModel =  mongoose.model('branch');

                async.waterfall([
                    function (getEnterpriseCallback) {
                        var getEnterpriseReq = _.clone(req);
                        getEnterpriseReq.query = {};
                        getEnterpriseReq.query.EnterpriseId = req.body.EnterpriseId;
                        enterpriseController.getEnterprise(req, res, true, function(resGetEntityErr, resGetEntity, resGetEntityRowsReturned, resGetEntityTotalRows){
                            if (!resGetEntityErr && resGetEntity){

                                enterpriseObj = _.first(resGetEntity);
                                getEnterpriseCallback();
                            }else{
                                getEnterpriseCallback(resGetEntityErr);
                            }
                        });                        
                    },                    
                    function(addBranchCallback){
                        //add the entity
                        var newEntity = new branchModel(addParms);
                        //add the new entity
                        newEntity.save(function (err, data) {
                            if (!err && data){
                                newBranchObj = data;
                                newBranchId = data._id;
                                console.log(newBranchObj);
                                addBranchCallback();
                            }else{
                                addBranchCallback(err);
                            }
                        });
                    },
                    function(updateEnterpriseObj) {
                        
                        if (enterpriseObj && newBranchObj) {
                            enterpriseModel.findByIdAndUpdate(
                                enterpriseObj._id
                                , {$addToSet: {'branches': newBranchObj._id}}
                                , { new : true }
                                , function (err, data) {
                                    updateEnterpriseObj();
                            });                             
                        }
                        else
                        {
                            updateEnterpriseObj();
                        }
                    }
                ], function (err) {
                    if (err){
                        apiHelper.addRes(req, res, err, null, null);
                    }else{
                        apiHelper.addRes(req, res, null, newBranchObj, null);
                    }
                });
            } else {
                apiHelper.apiResponse(req, res, true, 500, "Missing Parameters", null, null, null, null);
            }
        } else {
            apiHelper.apiResponse(req, res, true, 401, "Not found", null, null, null, null);
        }
    //});
};

var deleteBranch = exports.deleteBranch = function(req, res, override, callback){
    //authorizationHelper.authorize(req, res, [__ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.body.BranchId
            ) {
                var queryParms = {};
                if (req.body.BranchId) queryParms._id = req.body.BranchId;

                var branchModel = mongoose.model('branch');
                branchModel.remove(queryParms).exec(function (err, numberRemoved) {
                    apiHelper.deleteRes(req, res, err, numberRemoved, callback);
                });
            } else {
                apiHelper.apiResponse(req, res, true, 500, "Missing Parameter", null, null, null, callback);
            }
        } else {
            apiHelper.apiResponse(req, res, true, 401, "Not Authorized", null, null, null, callback);
        }
    //});
};
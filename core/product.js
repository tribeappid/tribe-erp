/*
 * Core Product API Mongo
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


// Generic get method for entity
// Authorized - Admin, System Admin
var getProduct = exports.getProduct = function(req, res, override, callback, apiOptions){
    var productId = null;
    var enterpriseId = null;
    var branchId = null;

    if (req.query.ProductId) productId = req.query.ProductId;
    if (req.query.EnterpriseId) enterpriseId = req.query.EnterpriseId;
    if (req.query.BranchId) branchId = req.query.BranchId;

    authorizationHelper.authorize(req, res, [ __ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, enterpriseId, override, function(authorized){
        if (1) {
            var totalSizeCount = null;
            var pageSize = null;
            var skipSize = null;

            var queryParms = {};

            //key parameters
            if (req.query.ProductId) queryParms._id = req.query.ProductId;
            if (req.query.Status) queryParms.status = req.query.Status;
            if (req.query.Type) queryParms.type = req.query.Type;
            if (req.query.Category) queryParms.category = req.query.Category;
            if (req.query.EnterpriseId) queryParms.enterprise = req.query.EnterpriseId;
            if (req.query.BranchId) queryParms.branches = req.query.BranchId;

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

            //second level population
            var nestedPopulation = {};
            if (options.nestedPopulation) nestedPopulation = options.nestedPopulation;

            //field selection option
            var productFields = {};
            var mediasFields = {};
            var enterpriseFields = {};
            var branchFields = {};

            productFields.__v = 0;
            mediasFields.__v = 0;
            enterpriseFields.__v = 0;
            branchFields.__v = 0;



            if (options.productFields) productFields = options.productFields;
            if (options.mediasFields) mediasFields = options.mediasFields;
            if (options.enterpriseFields) enterpriseFields = options.enterpriseFields;
            if (options.branchFields) branchFields = options.branchFields;

            //prior to the query parms, users extend parameters
            if (options.queryParms) _.extend(queryParms, options.queryParms);

            mongoose.model('product')
                .find(queryParms)
                .select(productFields)
                .skip(skipSize)
                .limit(pageSize)
                .sort(sort)
                .lean()
                .populate('enterprise', enterpriseFields)
                .populate('branches', branchFields)
                .populate('medias', mediasFields)
                .exec(function (err, data) {
                    if (totalSizeCount){
                        mongoose.model('product').find(queryParms).count().exec(function(err, count){
                            apiHelper.getRes(req, res, err, data, count,callback);
                        })
                    }else{
                        apiHelper.getRes(req, res, err, data, null, callback);
                    }                    
                });
        } else {
            apiHelper.apiResponse(req, res, true, 401, "Not Authorized", null, null, null, callback);
        }
    });
};

// Generic add method for entity
// Authorized - Admin, System Admin
var addProduct = exports.addProduct = function(req, res, override, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (req.body.Name && (req.body.BranchId || req.body.AllBranch == "1" || req.body.BranchIds)) 
            {
                var addParms = {};

                //default values
                addParms._id = idGenHelper.generateId();
                addParms.create_date = dateTimeHelper.utcNow();
                addParms.last_update = dateTimeHelper.utcNow();

                //parameter values
                addParms.name = req.body.Name;
                if (req.body.AllBranch == "1")
                {
                    addParms.branches = [];
                    addParms.all_branch = true;
                }
                else if (req.body.BranchIds)
                {
                    addParms.all_branch = false;
                    addParms.branches = req.body.BranchIds;
                }
                else if (req.body.BranchId)
                {
                    addParms.all_branch = false;
                    addParms.branches = req.body.BranchId;
                }                
                
                if (req.body.ProductId) addParms._id = req.body.ProductId;
                if (req.body.Status) addParms.status = req.body.Status;
                if (req.body.Description) addParms.description = req.body.Description;
                if (req.body.Type) addParms.type = req.body.Type;
                if (req.body.CreateDate) addParms.create_date = req.body.CreateDate;
                if (req.body.LastUpdate) addParms.last_update = req.body.LastUpdate;
                if (req.body.PublishDate) addParms.publish_date = req.body.PublishDate;
                if (req.body.EnterpriseId) addParms.enterprise = req.body.EnterpriseId;
                if (req.body.Length) addParms.length = req.body.Length;
                if (req.body.Width) addParms.width = req.body.Width;
                if (req.body.Height) addParms.height = req.body.Height;
                if (req.body.Weight) addParms.weight = req.body.Weight;
                if (req.body.Code) addParms.code = req.body.Code;

                console.log(req.body);
                var newProductObj = null;
                var newProductId = null;
                var productModel =  mongoose.model('product');

                async.waterfall([
                    function(addProductCallback){
                        //add the entity
                        var newEntity = new productModel(addParms);
                        //add the new entity
                        newEntity.save(function (err, data) {
                            if (!err && data){
                                newProductObj = data;
                                newProductId = data._id;
                                console.log(newProductObj);
                                addProductCallback();
                            }else{
                                addProductCallback(err);
                            }
                        });
                    }
                ], function (err) {
                    if (err){
                        apiHelper.addRes(req, res, err, null, null);
                    }else{
                        apiHelper.addRes(req, res, null, newProductObj, null);
                    }
                });
            } else {
                apiHelper.apiResponse(req, res, true, 500, "Missing Parameters", null, null, null, null);
            }
        } else {
            apiHelper.apiResponse(req, res, true, 401, "Not Authorized", null, null, null, null);
        }
    //});
};

var updateProduct = exports.updateProduct = function(req, res, override, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.body.ProductId
            ) {
                var queryParms = {};
                if (req.body.ProductId) queryParms._id = req.body.ProductId;

                //Editing Object
                var updateParms = {};
                updateParms.$unset = {};

                //default values
                updateParms.last_update = dateTimeHelper.utcNow();

                //key values
                if (req.body.Name) updateParms.name = req.body.Name;
                if (req.body.Description) updateParms.description = req.body.Description;
                if (req.body.Type) updateParms.type = req.body.Type;
                if (req.body.PublishDate) updateParms.publish_date = req.body.PublishDate;
                if (req.body.EnterpriseId) updateParms.enterprise = req.body.EnterpriseId;
                if (req.body.Length) updateParms.length = req.body.Length;
                if (req.body.Width) updateParms.width = req.body.Width;
                if (req.body.Height) updateParms.height = req.body.Height;
                if (req.body.Weight) updateParms.weight = req.body.Weight;
                if (req.body.Code) updateParms.code = req.body.Code;

                if (req.body.AllBranch == "1")
                {
                    updateParms.branches = [];
                    updateParms.all_branch = true;
                }
                else if (req.body.BranchIds)
                {
                    updateParms.all_branch = false;
                    updateParms.branches = req.body.BranchIds;
                }
                else if (req.body.BranchId)
                {
                    updateParms.all_branch = false;
                    updateParms.branches = req.body.BranchId;
                }                

                //final check on unset to prevent errors
                if (_.isEmpty(updateParms.$unset)) {
                    delete updateParms.$unset;
                }

                var updateProductObj = null;
                var entityModel = mongoose.model('product');
                async.waterfall([
                        function(updateProductCallback){
                            //update entity
                            entityModel.update(
                                queryParms
                                , updateParms
                                , { multi: true }
                                , function(err, data){
                                    if (!err && data){
                                        updateProductObj = data;
                                        updateProductCallback();
                                    }else{
                                        updateProductCallback(err);
                                    }
                                });
                        }

                ], function (err) {
                    if (err){
                        apiHelper.updateRes(req, res, err, null, null, callback);
                    }else{
                        var numberAffected = null;
                        if (updateProductObj) numberAffected = updateProductObj.nModified;
                        apiHelper.updateRes(req, res, null, updateProductObj, numberAffected, callback);
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

var deleteProduct = exports.deleteProduct = function(req, res, override, callback){
    //authorizationHelper.authorize(req, res, [__ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.body.ProductId
            ) {
                var queryParms = {};
                if (req.body.ProductId) queryParms._id = req.body.ProductId;

                var productModel = mongoose.model('product');
                productModel.remove(queryParms).exec(function (err, numberRemoved) {
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
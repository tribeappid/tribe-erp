/*
 * Core Entity API Mongo
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
var getEntity = exports.getEntity = function(req, res, override, callback, apiOptions){
    var enterpriseId = null;
    var entityId = null;

    if (req.query.Enterprise) enterpriseId = req.query.Enterprise;
    if (req.query.EntityId) entityId = req.query.EntityId;

    authorizationHelper.authorize(req, res, [ __ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], entityId, enterpriseId, override, function(authorized){
        if (authorized) {
            var totalSizeCount = null;
            var pageSize = null;
            var skipSize = null;

            var queryParms = {};

            //key parameters
            if (req.query.EntityId) queryParms._id = req.query.EntityId;
            if (req.query.AuthenticationId) queryParms.authentication_id = req.query.AuthenticationId;
            if (req.query.Status) queryParms.status = req.query.Status;
            if (req.query.Approved || req.query.Approved === false) queryParms.approved = req.query.Approved;
            if (req.query.Disabled || req.query.Disabled === false) queryParms.disabled = req.query.Disabled;
            if (req.query.Type) queryParms.type = req.query.Type;
            if (req.query.Demo || req.query.Demo === false) queryParms.demo = req.query.Demo;
            if (req.query.Pin) queryParms.pin = req.query.Pin;
            if (req.query.AuthenticationStringLower) queryParms.authentication_string_lower = req.query.AuthenticationStringLower;
            if (req.query.AuthorizationLevel) queryParms.authorization_level = req.query.AuthorizationLevel;
            if (req.query.Enterprise) queryParms.enterprise = req.query.Enterprise;
            if (req.query.ReferralCode) queryParms.referral_code = req.query.ReferralCode;

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
            var entityFields = {};
            var mediasFields = {};
            var enterpriseFields = {};
            var referredByFields = {};

            var enterpriseMediaFields = {};

            entityFields.__v = 0;
            mediasFields.__v = 0;
            enterpriseFields.__v = 0;
            referredByFields.__v = 0;

            enterpriseMediaFields.__v = 0;

            //default hidden hash fields
            entityFields.hash = 0;

            if (options.entityFields) entityFields = options.entityFields;
            if (options.mediasFields) mediasFields = options.mediasFields;
            if (options.enterpriseFields) enterpriseFields = options.enterpriseFields;

            if (options.enterpriseMediaFields) enterpriseMediaFields = options.enterpriseMediaFields;

            //prior to the query parms, users extend parameters
            if (options.queryParms) _.extend(queryParms, options.queryParms);

            mongoose.model('entity')
                .find(queryParms)
                .select(entityFields)
                .skip(skipSize)
                .limit(pageSize)
                .sort(sort)
                .lean()
                .populate('medias', mediasFields)
                .populate('enterprise', enterpriseFields)
                .populate('referred_by', referredByFields)
                .exec(function (err, data) {
                    if (totalSizeCount){
                        mongoose.model('entity').find(queryParms).count().exec(function(err, count){
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

// Generic add method for entity
// Authorized - Admin, System Admin
var addEntity = exports.addEntity = function(req, res, override, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.body.FirstName ||
                req.body.LastName ||
                req.body.Name
            ) {
                var addParms = {};

                //default values
                addParms._id = idGenHelper.generateId();
                addParms.create_date = dateTimeHelper.utcNow();
                addParms.last_update = dateTimeHelper.utcNow();

                //parameter values
                if (req.body.EntityId) addParms._id = req.body.EntityId;
                if (req.body.FirstName) addParms.first_name = req.body.FirstName;
                if (req.body.LastName) addParms.last_name = req.body.LastName;
                if (req.body.Name) addParms.name = req.body.Name;
                if (req.body.Status) addParms.status = req.body.Status;
                if (req.body.Approved || req.body.Approved === false) addParms.approved = req.body.Approved;
                if (req.body.Disabled || req.body.Disabled === false) addParms.disabled = req.body.Disabled;
                if (req.body.Type) addParms.type = req.body.Type;
                if (req.body.Demo || req.body.Demo === false) addParms.demo = req.body.Demo;
                if (req.body.CreateDate) addParms.create_date = req.body.CreateDate;
                if (req.body.LastUpdate) addParms.last_update = req.body.LastUpdate;
                if (req.body.DateEstablished) addParms.date_established = req.body.DateEstablished;
                if (req.body.AuthenticationString) addParms.authentication_string = req.body.AuthenticationString.toLowerCase();
                if (req.body.AuthenticationAttempts) addParms.authentication_attempts = req.body.AuthenticationAttempts;
                if (req.body.Password) addParms.hash = cryptHelper.encryptBCrypt(req, res, req.body.Password);
                if (req.body.Hash) addParms.hash = req.body.Hash;
                if (req.body.LastLogin) addParms.last_login = req.body.LastLogin;
                if (req.body.LastLogout) addParms.last_logout = req.body.LastLogout;
                if (req.body.LastChangePassword) addParms.last_change_password = req.body.LastChangePassword;
                if (req.body.AuthorizationLevel) addParms.authorization_level = req.body.AuthorizationLevel;
                if (req.body.Pin) addParms.pin = req.body.Pin;
                if (req.body.Enterprise) addParms.enterprise = req.body.Enterprise;
                if (req.body.ReferredBy) addParms.referred_by = req.body.ReferredBy;
                if (req.body.ReferralCode) addParms.referral_code = req.body.ReferralCode;

                if (!addParms.name) addParms.name = stringHelper.toName(req, res, req.body.FirstName, req.body.LastName);

                console.log(req.body);
                var newEntityObj = null;
                var newEntityId = null;
                var entityModel =  mongoose.model('entity');

                async.waterfall([
                    function(addEntityCallback){
                        //add the entity
                        var newEntity = new entityModel(addParms);
                        //add the new entity
                        newEntity.save(function (err, data) {
                            if (!err && data){
                                newEntityObj = data;
                                newEntityId = data._id;
                                console.log(newEntityObj);
                                addEntityCallback();
                            }else{
                                addEntityCallback(err);
                            }
                        });
                    }
                ], function (err) {
                    if (err){
                        apiHelper.addRes(req, res, err, null, null);
                    }else{
                        console.log('call apiHelper AddRess with newEntityObj');
                        apiHelper.addRes(req, res, null, newEntityObj, null);
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


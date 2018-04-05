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
            if (req.query.AuthenticationString) queryParms.authentication_string = req.query.AuthenticationString;
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
            if (req.query.Phone) queryParms.phone = req.query.Phone;

            console.log(queryParms);
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
                if (req.body.Phone) addParms.phone = req.body.Phone;

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

var updateEntity = exports.updateEntity = function(req, res, override, callback){
    //authorizationHelper.authorize(req, res, [__ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.body.EntityId ||
                req.body.ThirdPartyId
            ) {
                //Querying Object
                var queryParms = {};
                if (req.body.EntityId) queryParms._id = req.body.EntityId;
                if (req.body.ThirdPartyId) queryParms.third_party_id = req.body.ThirdPartyId;

                //Editing Object
                var updateParms = {};
                updateParms.$unset = {};

                //default values
                updateParms.last_update = dateTimeHelper.utcNow();

                //key values
                if (req.body.AuthenticationString) updateParms.authentication_string = req.body.AuthenticationString;
                if (req.body.AuthenticationStringLower) updateParms.authentication_string_lower = req.body.AuthenticationStringLower;
                if (req.body.Hash) updateParms.hash = req.body.Hash;
                if (req.body.LastLogin) updateParms.last_login = req.body.LastLogin;
                if (req.body.LastLogout) updateParms.last_logout = req.body.LastLogout;
                if (req.body.LastChangePassword) updateParms.last_change_password = req.body.LastChangePassword;
                if (req.body.RequestAuthenticationStart) updateParms.request_authentication_start = req.body.RequestAuthenticationStart;
                if (req.body.RequestAuthenticationEnd) updateParms.request_authentication_end = req.body.RequestAuthenticationEnd;
                if (req.body.RequestAuthenticationHash) updateParms.request_authentication_hash = req.body.RequestAuthenticationHash;
                if (req.body.RequestAuthenticationSecret) updateParms.request_authentication_secret = req.body.RequestAuthenticationSecret;
                if (req.body.AuthenticationAttempts) updateParms.authentication_attempts = req.body.AuthenticationAttempts;
                if (req.body.AuthorizationLevel) updateParms.authorization_level = req.body.AuthorizationLevel;
                if (req.body.FirstName) updateParms.first_name = req.body.FirstName;
                if (req.body.LastName) updateParms.last_name = req.body.LastName;
                if (req.body.NickName) updateParms.nick_name = req.body.NickName;
                if (req.body.Name) updateParms.name = req.body.Name;
                if (req.body.Status) updateParms.status = req.body.Status;
                if (req.body.Citizenship) updateParms.citizenship = req.body.Citizenship;
                if (req.body.Approved || req.body.Approved === false) updateParms.approved = req.body.Approved;
                if (req.body.Disabled || req.body.Disabled === false) updateParms.disabled = req.body.Disabled;
                if (req.body.Type) updateParms.type = req.body.Type;
                if (req.body.DefaultLanguage) updateParms.default_language = req.body.DefaultLanguage;
                if (req.body.Rating) updateParms.rating = req.body.Rating;
                if (req.body.RatingTimes) updateParms.rating_times = req.body.RatingTimes;
                if (req.body.Demo || req.body.Demo === false) updateParms.demo = req.body.Demo;
                if (req.body.Staging || req.body.Staging === false) updateParms.staging = req.body.Staging;
                if (req.body.CreateDate) updateParms.create_date = req.body.CreateDate;
                if (req.body.LastUpdate) updateParms.last_update = req.body.LastUpdate;
                if (req.body.DateEstablished) updateParms.date_established = req.body.DateEstablished;
                if (req.body.Enterprise) updateParms.enterprise = req.body.Enterprise;
                if (req.body.AnName) updateParms.an_name = req.body.AnName;
                if (req.body.Prefix) updateParms.prefix = req.body.Prefix;
                if (req.body.WebUrl) updateParms.web_url = req.body.WebUrl;
                if (req.body.WebProtocol) updateParms.web_protocol = req.body.WebProtocol;
                if (req.body.BusinessHourStart) updateParms.business_hour_start = req.body.BusinessHourStart;
                if (req.body.BusinessHourEnd) updateParms.business_hour_end = req.body.BusinessHourEnd;
                if (req.body.BusinessDays) updateParms.business_days = req.body.BusinessDays;
                if (req.body.Pin) updateParms.pin = req.body.Pin;
                if (req.body.Extension) updateParms.extension = req.body.Extension;
                if (req.body.LocationName) updateParms.location_name = req.body.LocationName;
                if (req.body.Layout) updateParms.layout = req.body.Layout;
                if (req.body.NewThirdPartyId) updateParms.third_party_id = req.body.NewThirdPartyId;
                if (req.body.NewThirdPartyBillingId) updateParms.third_party_billing_id = req.body.NewThirdPartyBillingId;
                if (req.body.ThirdPartyBilling || req.body.ThirdPartyBilling  === false) updateParms.third_party_billing = req.body.ThirdPartyBilling;
                if (req.body.Billing || req.body.Billing === false) updateParms.billing = req.body.Billing;
                if (req.body.BillingId) updateParms.billing_id = req.body.BillingId;
                if (req.body.GovernmentId) updateParms.government_id = req.body.GovernmentId;
                if (req.body.Height) updateParms.height = req.body.Height;
                if (req.body.Latitude) updateParms.latitude = req.body.Latitude;
                if (req.body.Longitude) updateParms.longitude = req.body.Longitude;
                if (req.body.ItlSync || req.body.ItlSync === false) updateParms.itl_sync = req.body.ItlSync;
                if (req.body.ReferredBy) updateParms.referred_by = req.body.ReferredBy;
                if (req.body.ReferralCode) updateParms.referral_code = req.body.ReferralCode;
                if (req.body.LeftFinger) updateParms.left_finger = req.body.LeftFinger;
                if (req.body.RightFinger) updateParms.right_finger = req.body.RightFinger;
                if (req.body.FingerLastUpdate) updateParms.finger_last_update = req.body.FingerLastUpdate;
                if (req.body.Userprofile) updateParms.userprofile = req.body.Userprofile;
                if (req.body.Phone) updateParms.phone = req.body.Phone;
                //if (req.body.CondominiumId) updateParms.condominium = req.body.CondominiumId;

                //unset features
                if (req.body.Card === '') updateParms.$unset.card = 1;
                if (req.body.Sip === '') updateParms.$unset.sip = 1;
                if (req.body.Pin === '') updateParms.$unset.pin = 1;
                if (req.body.Extension === '') updateParms.$unset.extension = 1;
                if (req.body.Extension === '') updateParms.$unset.extension = 1;
                if (req.body.Enterprise === '') updateParms.$unset.enterprise = 1;
                if (req.body.RequestAuthenticationStart === '') updateParms.$unset.request_authentication_start = 1;
                if (req.body.RequestAuthenticationEnd === '') updateParms.$unset.request_authentication_end = 1;
                if (req.body.RequestAuthenticationHash === '') updateParms.$unset.request_authentication_hash = 1;
                if (req.body.RequestAuthenticationSecret === '') updateParms.$unset.request_authentication_secret = 1;
                if (req.body.Plans ==='') updateParms.$unset.plans = 1;
                if (req.body.Modules === []) updateParms.$unset.modules = 1;

                //unset features
                if (req.body.AuthenticationAttempts === '') updateParms.$unset.authentication_attempts = 1;

                //final check on unset to prevent errors
                if (_.isEmpty(updateParms.$unset)) {
                    delete updateParms.$unset;
                }

                var updateEntityObj = null;
                var entityModel = mongoose.model('entity');
                async.waterfall([
                        function(updateEntityCallback){
                            //update entity
                            entityModel.update(
                                queryParms
                                , updateParms
                                , { multi: true }
                                , function(err, data){
                                    if (!err && data){
                                        updateEntityObj = data;
                                        updateEntityCallback();
                                    }else{
                                        updateEntityCallback(err);
                                    }
                                });
                        }
                        /*,
                        function(updateReferencesCallback){
                            if (
                                req.body.Emails ||
                                req.body.EmailIds ||
                                req.body.AllergyIds ||
                                req.body.DiagnoseIds ||
                                req.body.Phones ||
                                req.body.PhoneIds ||
                                req.body.Addresses ||
                                req.body.AddressIds ||
                                req.body.MediaIds ||
                                req.body.Cards ||
                                req.body.CardIds ||
                                req.body.SipIds ||
                                req.body.DeviceIds ||
                                req.body.EntityRelationshipIds ||
                                req.body.DoorIds ||
                                req.body.ModuleIds ||
                                req.body.RemoveEmailIds ||
                                req.body.RemoveCondominiumIds ||
                                req.body.RemoveAllergyIds ||
                                req.body.RemoveDiagnoseIds ||
                                req.body.RemovePhoneIds ||
                                req.body.RemoveAddressIds ||
                                req.body.RemoveMediaIds ||
                                req.body.RemoveCardIds ||
                                req.body.RemoveSipIds ||
                                req.body.RemoveDeviceIds ||
                                req.body.RemoveEntityRelationshipIds ||
                                req.body.RemoveDoorIds ||
                                req.body.RemoveModuleIds ||
                                req.body.RemoveDoorIds ||
                                req.body.RemoveModuleIds ||
                                req.body.SpecializationIds ||
                                req.body.RemoveSpecializationIds ||
                                req.body.WrittenLanguageIds ||
                                req.body.RemoveWrittenLanguageIds ||
                                req.body.SpokenLanguageIds ||
                                req.body.RemoveSpokenLanguageIds ||
                                req.body.CaregivingSkillIds ||
                                req.body.RemoveCaregivingSkillIds ||
                                req.body.ClinicalSkillIds ||
                                req.body.RemoveClinicalSkillIds ||
                                req.body.PlanSubscriptionIds ||
                                req.body.RemovePlanSubscriptionIds ||
                                req.body.ApartmentIds ||
                                req.body.CondominiumIds
                            ) {
                                //async parallel
                                var asyncTasks = [];

                                var emailsArray = null;
                                var emailIdArray = null;
                                var removeEmailIdArray = null;
                                var allergyIdArray = null;
                                var removeAllergyIdArray = null;
                                var diagnoseIdArray = null;
                                var removeDiagnoseIdArray = null;
                                var phonesArray = null;
                                var phoneIdArray = null;
                                var removePhoneIdArray = null;
                                var addressesArray = null;
                                var addressIdArray = null;
                                var removeAddressIdArray = null;
                                var mediaIdArray = null;
                                var removeMediaIdArray = null;
                                var cardsArray = null;
                                var cardIdArray = null;
                                var removeCardIdArray = null;
                                var sipIdArray = null;
                                var removeSipIdArray = null;
                                var deviceIdArray = null;
                                var removeDeviceIdArray = null;
                                var entityRelationshipIdArray = null;
                                var removeEntityRelationshipIdArray = null;
                                var doorIdArray = null;
                                var removeDoorIdArray = null;
                                var moduleIdArray = null;
                                var removeModuleIdArray = null;
                                var planSubscriptionIdArray = null;
                                var removePlanSubscriptionIdArray = null;
                                var specializationIdsArray = null;
                                var removeSpecializationIdsArray = null;
                                var writtenLanguageIdsArray = null;
                                var removeWrittenLanguageIdsArray = null;
                                var spokenLanguageIdsArray = null;
                                var removeSpokenLanguageIdsArray = null;
                                var caregivingSkillIdsArray = null;
                                var removeCaregivingSkillIdsArray = null;
                                var clinicalSkillIdsArray = null;
                                var removeClinicalSkillIdsArray = null;
                                var apartmentIdsArray = null;
                                var condominiumIdsArray = null;

                                if (req.body.Emails) emailsArray = req.body.Emails;
                                if (req.body.EmailIds) emailIdArray = req.body.EmailIds;
                                if (req.body.AllergyIds) allergyIdArray = req.body.AllergyIds;
                                if (req.body.DiagnoseIds) diagnoseIdArray = req.body.DiagnoseIds;
                                if (req.body.Phones) phonesArray = req.body.Phones;
                                if (req.body.PhoneIds) phoneIdArray = req.body.PhoneIds;
                                if (req.body.Addresses) addressesArray = req.body.Addresses;
                                if (req.body.AddressIds) addressIdArray = req.body.AddressIds;
                                if (req.body.MediaIds) mediaIdArray = req.body.MediaIds;
                                if (req.body.Cards) cardsArray = req.body.Cards;
                                if (req.body.CardIds) cardIdArray = req.body.CardIds;
                                if (req.body.SipIds) sipIdArray = req.body.SipIds;
                                if (req.body.DeviceIds) deviceIdArray = req.body.DeviceIds;
                                if (req.body.EntityRelationshipIds) entityRelationshipIdArray = req.body.EntityRelationshipIds;
                                if (req.body.DoorIds) doorIdArray = req.body.DoorIds;
                                if (req.body.ModuleIds) moduleIdArray = req.body.ModuleIds;
                                if (req.body.RemoveEmailIds) removeEmailIdArray = req.body.RemoveEmailIds;
                                if (req.body.RemoveCondominiumIds) removeCondominiumIdArray = req.body.RemoveCondominiumIds;
                                if (req.body.RemoveAllergyIds) removeAllergyIdArray = req.body.RemoveAllergyIds;
                                if (req.body.RemoveDiagnoseIds) removeDiagnoseIdArray = req.body.RemoveDiagnoseIds;
                                if (req.body.RemovePhoneIds) removePhoneIdArray = req.body.RemovePhoneIds;
                                if (req.body.RemoveAddressIds) removeAddressIdArray = req.body.RemoveAddressIds;
                                if (req.body.RemoveMediaIds) removeMediaIdArray = req.body.RemoveMediaIds;
                                if (req.body.RemoveCardIds) removeCardIdArray = req.body.RemoveCardIds;
                                if (req.body.RemoveSipIds) removeSipIdArray = req.body.RemoveSipIds;
                                if (req.body.RemoveDeviceIds) removeDeviceIdArray = req.body.RemoveDeviceIds;
                                if (req.body.RemoveEntityRelationshipIds) removeEntityRelationshipIdArray = req.body.RemoveEntityRelationshipIds;
                                if (req.body.RemoveDoorIds) removeDoorIdArray = req.body.RemoveDoorIds;
                                if (req.body.RemoveModuleIds) removeModuleIdArray = req.body.RemoveModuleIds;
                                if (req.body.PlanSubscriptionIds) planSubscriptionIdArray = req.body.PlanSubscriptionIds;
                                if (req.body.RemovePlanSubscriptionIds) removePlanSubscriptionIdArray = req.body.RemovePlanSubscriptionIds;
                                if (req.body.WrittenLanguageIds) writtenLanguageIdsArray = req.body.WrittenLanguageIds;
                                if (req.body.RemoveWrittenLanguageIds) removeWrittenLanguageIdsArray = req.body.RemoveWrittenLanguageIds;
                                if (req.body.SpokenLanguageIds) spokenLanguageIdsArray = req.body.SpokenLanguageIds;
                                if (req.body.RemoveSpokenLanguageIds) removeSpokenLanguageIdsArray = req.body.RemoveSpokenLanguageIds;
                                if (req.body.ApartmentIds) apartmentIdsArray = req.body.ApartmentIds;
                                if (req.body.CondominiumIds) condominiumIdsArray = req.body.CondominiumIds;

                                if (condominiumIdsArray) {
                                    asyncTasks.push(function (addCondominiumIdsCallback) {
                                        async.each(condominiumIdsArray,
                                            function (condominiumId, addCondominiumIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'condominiums': condominiumId}}
                                                    , function (err, data) {
                                                        addCondominiumIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addCondominiumIdsCallback();
                                            });
                                    });
                                }

                                if (apartmentIdsArray) {
                                    asyncTasks.push(function (addApartmentIdsCallback) {
                                        async.each(apartmentIdsArray,
                                            function (apartmentId, addApartmentIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'apartment': apartmentId}}
                                                    , function (err, data) {
                                                        addApartmentIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addApartmentIdsCallback();
                                            });
                                    });
                                }

                                if (spokenLanguageIdsArray) {
                                    asyncTasks.push(function (addSpokenLanguageIdsCallback) {
                                        async.each(spokenLanguageIdsArray,
                                            function (spokenLanguageId, addSpokenLanguageIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'spoken_languages': spokenLanguageId}}
                                                    , function (err, data) {
                                                        addSpokenLanguageIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addSpokenLanguageIdsCallback();
                                            });
                                    });
                                }

                                if (removeSpokenLanguageIdsArray) {
                                    asyncTasks.push(function (removeSpokenLanguageIdsCallback) {
                                        async.each(removeSpokenLanguageIdsArray,
                                            function (removeSpokenLanguageId, removeSpokenLanguageIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'spoken_languages' : removeSpokenLanguageId} }
                                                    , function(err, data) {
                                                        removeSpokenLanguageIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeSpokenLanguageIdsCallback();
                                            });
                                    });
                                }
                                
                                if (writtenLanguageIdsArray) {
                                    asyncTasks.push(function (addWrittenLanguageIdsCallback) {
                                        async.each(writtenLanguageIdsArray,
                                            function (writtenLanguageId, addWrittenLanguageIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'written_languages': writtenLanguageId}}
                                                    , function (err, data) {
                                                        addWrittenLanguageIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addWrittenLanguageIdsCallback();
                                            });
                                    });
                                }

                                if (removeWrittenLanguageIdsArray) {
                                    asyncTasks.push(function (removeWrittenLanguageIdsCallback) {
                                        async.each(removeWrittenLanguageIdsArray,
                                            function (removeWrittenLanguageId, removeWrittenLanguageIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'written_languages' : removeWrittenLanguageId} }
                                                    , function(err, data) {
                                                        removeWrittenLanguageIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeWrittenLanguageIdsCallback();
                                            });
                                    });
                                }

                                //if emails exists, loop and insert
                                if (emailsArray) {
                                    asyncTasks.push(function (addEmailsCallback) {
                                        async.each(emailsArray,
                                            function (email, addEmailCallback) {
                                                req, req.body = {};
                                                //default mapping to parent
                                                req.body.Entity = queryParms._id;
                                                if (email.EmailAddress) req.body.EmailAddress = email.EmailAddress;
                                                if (email.CreateDate) req.body.CreateDate = email.CreateDate;
                                                if (email.LastUpdate) req.body.LastUpdate = email.LastUpdate;
                                                if (email.Entity) req.body.Entity = email.Entity;
                                                if (email.Device) req.body.Device = email.Device;
                                                emailController.addEmail(req, res, true, function (addEmailResErr, addEmailRes) {
                                                    if (addEmailRes && _.isObject(addEmailRes) && addEmailRes._id){
                                                        entityModel.update(
                                                            queryParms
                                                            , {$addToSet: {'emails': addEmailRes._id}}
                                                            , function (err, data) {
                                                                addEmailCallback();
                                                            });
                                                    }else{
                                                        addEmailCallback();
                                                    }
                                                })
                                            },
                                            function (err) {
                                                addEmailsCallback();
                                            });
                                    });
                                }

                                //if emails exists, loop and insert
                                if (emailIdArray) {
                                    asyncTasks.push(function (addEmailIdsCallback) {
                                        async.each(emailIdArray,
                                            function (emailId, addEmailIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'emails': emailId}}
                                                    , function (err, data) {
                                                        addEmailIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addEmailIdsCallback();
                                            });
                                    });
                                }

                                //if remove emails, loop and remove
                                if (removeEmailIdArray) {
                                    asyncTasks.push(function (removeEmailIdsCallback) {
                                        async.each(removeEmailIdArray,
                                            function (removeEmailId, removeEmailIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'emails' : removeEmailId} }
                                                    , function(err, data) {
                                                        removeEmailIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeEmailIdsCallback();
                                            });
                                    });
                                }

                                if (removeCondominiumIdArray) {
                                    asyncTasks.push(function (removeCondominiumIdsCallback) {
                                        async.each(removeCondominiumIdArray,
                                            function (removeCondominiumId, removeCondominiumIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'condominiums' : removeCondominiumId} }
                                                    , function(err, data) {
                                                        removeCondominiumIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeCondominiumIdsCallback();
                                            });
                                    });
                                }
                                
                                //if allergies exists, loop and insert
                                if (allergyIdArray) {
                                    asyncTasks.push(function (addAllergyIdsCallback) {
                                        async.each(allergyIdArray,
                                            function (allergyId, addAllergyIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'allergies': allergyId}}
                                                    , function (err, data) {
                                                        addAllergyIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addAllergyIdsCallback();
                                            });
                                    });
                                }

                                //if remove allergies, loop and remove
                                if (removeAllergyIdArray) {
                                    asyncTasks.push(function (removeAllergyIdsCallback) {
                                        async.each(removeAllergyIdArray,
                                            function (removeAllergyId, removeAllergyIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'allergies' : removeAllergyId} }
                                                    , function(err, data) {
                                                        removeAllergyIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeAllergyIdsCallback();
                                            });
                                    });
                                }

                                //if diagnosis exists, loop and insert
                                if (diagnoseIdArray) {
                                    asyncTasks.push(function (addDiagnoseIdsCallback) {
                                        async.each(diagnoseIdArray,
                                            function (diagnoseId, addDiagnoseIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'diagnosis': diagnoseId}}
                                                    , function (err, data) {
                                                        addDiagnoseIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addDiagnoseIdsCallback();
                                            });
                                    });
                                }

                                //if remove diagnosis, loop and remove
                                if (removeDiagnoseIdArray) {
                                    asyncTasks.push(function (removeDiagnoseIdsCallback) {
                                        async.each(removeDiagnoseIdArray,
                                            function (removeDiagnoseId, removeDiagnoseIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'diagnosis' : removeDiagnoseId} }
                                                    , function(err, data) {
                                                        removeDiagnoseIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeDiagnoseIdsCallback();
                                            });
                                    });
                                }

                                //if phones exists, loop and insert
                                if (phonesArray) {
                                    asyncTasks.push(function (addPhonesCallback) {
                                        async.each(phonesArray,
                                            function (phone, addPhoneCallback) {
                                                req, req.body = {};
                                                //default mapping to parent
                                                req.body.Entity = queryParms._id;
                                                if (phone.PhoneDigits) req.body.PhoneDigits = phone.PhoneDigits;
                                                if (phone.Digits) req.body.Digits = phone.Digits;
                                                if (phone.CountryCode) req.body.CountryCode = phone.CountryCode;
                                                if (phone.Code) req.body.Code = phone.Code;
                                                if (phone.Entity) req.body.Entity = phone.Entity;
                                                if (phone.Type) req.body.Type = phone.Type;
                                                if (phone.CreateDate) req.body.CreateDate = phone.CreateDate;
                                                if (phone.LastUpdate) req.body.LastUpdate = phone.LastUpdate;
                                                phoneController.addPhone(req, res, true, function (addPhoneResErr, addPhoneRes) {
                                                    if (addPhoneRes && _.isObject(addPhoneRes) && addPhoneRes._id){
                                                        if (!addPhoneResErr && addPhoneRes._id){
                                                            entityModel.update(
                                                                queryParms
                                                                , {$addToSet: {'phones': addPhoneRes._id}}
                                                                , function (err, data) {
                                                                    addPhoneCallback();
                                                                });
                                                        }else{
                                                            addPhoneCallback()
                                                        }
                                                    }else{
                                                        addPhoneCallback()
                                                    }
                                                })
                                            },
                                            function (err) {
                                                addPhonesCallback();
                                            });
                                    });
                                }

                                //if phones exists, loop and insert
                                if (phoneIdArray) {
                                    asyncTasks.push(function (addPhoneIdsCallback) {
                                        async.each(phoneIdArray,
                                            function (phoneId, addPhoneIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'phones': phoneId}}
                                                    , function (err, data) {
                                                        addPhoneIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addPhoneIdsCallback();
                                            });
                                    });
                                }

                                //if remove phones, loop and remove
                                if (removePhoneIdArray) {
                                    asyncTasks.push(function (removePhoneIdsCallback) {
                                        async.each(removePhoneIdArray,
                                            function (removePhoneId, removePhoneIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'phones' : removePhoneId} }
                                                    , function(err, data) {
                                                        removePhoneIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removePhoneIdsCallback();
                                            });
                                    });
                                }

                                //if address exists, loop and insert
                                if (addressesArray) {
                                    asyncTasks.push(function (addAddressesCallback) {
                                        async.each(addressesArray,
                                            function (address, addAddressCallback) {
                                                req, req.body = {};
                                                //default mapping to parent
                                                req.body.Entity = queryParms._id;
                                                if (address.CreateDate) req.body.CreateDate = address.CreateDate;
                                                if (address.LastUpdate) req.body.LastUpdate = address.LastUpdate;
                                                if (address.Apartment) req.body.Apartment = address.Apartment;
                                                if (address.RoadName) req.body.RoadName = address.RoadName;
                                                if (address.RoadName2) req.body.RoadName2 = address.RoadName2;
                                                if (address.Suite) req.body.Suite = address.Suite;
                                                if (address.Zip) req.body.Zip = address.Zip;
                                                if (address.Country) req.body.Country = address.Country;
                                                if (address.Province) req.body.Province = address.Province;
                                                if (address.State) req.body.State = address.State;
                                                if (address.City) req.body.City = address.City;
                                                if (address.Type) req.body.Type = address.Type;
                                                if (address.Status) req.body.Status = address.Status;
                                                if (address.Longitude) req.body.Longitude = address.Longitude;
                                                if (address.Latitude) req.body.Latitude = address.Latitude
                                                if (address.Entity) req.body.Entity = address.Entity;
                                                if (address.Device) req.body.Device = address.Device;
                                                addressController.addAddress(req, res, true, function (addAddressResErr, addAddressRes) {
                                                    if (addAddressRes && _.isObject(addAddressRes) && addAddressRes._id){
                                                        entityModel.update(
                                                            queryParms
                                                            , {$addToSet: {'addresses': addAddressRes._id}}
                                                            , function (err, data) {
                                                                addAddressCallback();
                                                            });
                                                    }else{
                                                        addAddressCallback();
                                                    }
                                                })
                                            },
                                            function (err) {
                                                addAddressesCallback();
                                            });
                                    });
                                }

                                //if address exists, loop and insert
                                if (addressIdArray) {
                                    asyncTasks.push(function (addAddressIdsCallback) {
                                        async.each(addressIdArray,
                                            function (addressId, addAddressIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'addresses': addressId}}
                                                    , function (err, data) {
                                                        addAddressIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addAddressIdsCallback();
                                            });
                                    });
                                }

                                //if remove address, loop and remove
                                if (removeAddressIdArray) {
                                    asyncTasks.push(function (removeAddressIdsCallback) {
                                        async.each(removeAddressIdArray,
                                            function (removeAddressId, removeAddressIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'addresses' : removeAddressId} }
                                                    , function(err, data) {
                                                        removeAddressIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeAddressIdsCallback();
                                            });
                                    });
                                }

                                //if media exists, loop and insert
                                if (mediaIdArray) {
                                    asyncTasks.push(function (addMediaIdsCallback) {
                                        async.each(mediaIdArray,
                                            function (mediaId, addMediaIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'medias': mediaId}}
                                                    , function (err, data) {
                                                        addMediaIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addMediaIdsCallback();
                                            });
                                    });
                                }

                                //if remove media, loop and remove
                                if (removeMediaIdArray) {
                                    asyncTasks.push(function (removeMediaIdsCallback) {
                                        async.each(removeMediaIdArray,
                                            function (removeMediaId, removeMediaIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'medias' : removeMediaId} }
                                                    , function(err, data) {
                                                        removeMediaIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeMediaIdsCallback();
                                            });
                                    });
                                }

                                //if cards exists, loop and insert
                                if (cardsArray) {
                                    asyncTasks.push(function (addCardsCallback) {
                                        async.each(cardsArray,
                                            function (card, addCardCallback) {
                                                req, req.body = {};
                                                //default mapping to parent
                                                req.body.Entity = queryParms._id;
                                                if (card.Code) req.body.Code = card.Code;
                                                if (card.CardId) req.body.CardId = card.CardId;
                                                if (card.Type) req.body.Type = card.Type;
                                                if (card.Enterprise) req.body.Enterprise = card.Enterprise;
                                                if (card.Entity) req.body.Entity = card.Entity;
                                                cardController.addCard(req, res, true, function (addCardResErr, addCardRes) {
                                                    if (addCardRes && _.isObject(addCardRes) && addCardRes._id){
                                                        entityModel.update(
                                                            queryParms, 
                                                            {$addToSet: {'cards': addCardRes._id}}
                                                            , function (err, data) {
                                                                addCardCallback();
                                                            });
                                                    }else{
                                                        addCardCallback();
                                                    }
                                                })
                                            },
                                            function (err) {
                                                addCardsCallback();
                                            });
                                    });
                                }                                
                                //if card exists, loop and insert
                                if (cardIdArray) {
                                    asyncTasks.push(function (addCardIdsCallback) {
                                        async.each(cardIdArray,
                                            function (cardId, addCardIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'cards': cardId}}
                                                    , function (err, data) {
                                                        addCardIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addCardIdsCallback();
                                            });
                                    });
                                }

                                //if remove card, loop and remove
                                if (removeCardIdArray) {
                                    asyncTasks.push(function (removeCardIdsCallback) {
                                        async.each(removeCardIdArray,
                                            function (removeCardId, removeCardIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'cards' : removeCardId} }
                                                    , function(err, data) {
                                                        removeCardIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeCardIdsCallback();
                                            });
                                    });
                                }

                                //if sip exists, loop and insert
                                if (sipIdArray) {
                                    asyncTasks.push(function (addSipIdsCallback) {
                                        async.each(sipIdArray,
                                            function (sipId, addSipIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'sips': sipId}}
                                                    , function (err, data) {
                                                        addSipIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addSipIdsCallback();
                                            });
                                    });
                                }

                                //if remove sip, loop and remove
                                if (removeSipIdArray) {
                                    asyncTasks.push(function (removeSipIdsCallback) {
                                        async.each(removeSipIdArray,
                                            function (removeSipId, removeSipIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'sips' : removeSipId} }
                                                    , function(err, data) {
                                                        removeSipIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeSipIdsCallback();
                                            });
                                    });
                                }

                                //if device exists, loop and insert
                                if (deviceIdArray) {
                                    asyncTasks.push(function (addDeviceIdsCallback) {
                                        async.each(deviceIdArray,
                                            function (deviceId, addDeviceIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'devices': deviceId}}
                                                    , function (err, data) {
                                                        addDeviceIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addDeviceIdsCallback();
                                            });
                                    });
                                }

                                //if remove device, loop and remove
                                if (removeDeviceIdArray) {
                                    asyncTasks.push(function (removeDeviceIdsCallback) {
                                        async.each(removeDeviceIdArray,
                                            function (removeDeviceId, removeDeviceIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'devices' : removeDeviceId} }
                                                    , function(err, data) {
                                                        removeDeviceIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeDeviceIdsCallback();
                                            });
                                    });
                                }

                                //if entity relationship exists, loop and insert
                                if (entityRelationshipIdArray) {
                                    asyncTasks.push(function (addEntityRelationshipIdsCallback) {
                                        async.each(entityRelationshipIdArray,
                                            function (entityRelationshipId, addEntityRelationshipIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'related_entities': entityRelationshipId}}
                                                    , function (err, data) {
                                                        addEntityRelationshipIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addEntityRelationshipIdsCallback();
                                            });
                                    });
                                }

                                //if remove entity relationship, loop and remove
                                if (removeEntityRelationshipIdArray) {
                                    asyncTasks.push(function (removeEntityRelationshipIdsCallback) {
                                        async.each(removeEntityRelationshipIdArray,
                                            function (removeEntityRelationshipId, removeEntityRelationshipIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'related_entities' : removeEntityRelationshipId} }
                                                    , function(err, data) {
                                                        removeEntityRelationshipIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeEntityRelationshipIdsCallback();
                                            });
                                    });
                                }

                                //if doors exists, loop and insert
                                if (doorIdArray) {
                                    asyncTasks.push(function (addDoorIdsCallback) {
                                        async.each(doorIdArray,
                                            function (doorId, addDoorIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'doors': doorId}}
                                                    , function (err, data) {
                                                        addDoorIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addDoorIdsCallback();
                                            });
                                    });
                                }

                                //if remove door, loop and remove
                                if (removeDoorIdArray) {
                                    asyncTasks.push(function (removeDoorIdsCallback) {
                                        async.each(removeDoorIdArray,
                                            function (removeDoorId, removeDoorIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'doors' : removeDoorId} }
                                                    , function(err, data) {
                                                        removeDoorIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeDoorIdsCallback();
                                            });
                                    });
                                }

                                //if modules exists, loop and insert
                                if (moduleIdArray) {
                                    asyncTasks.push(function (addModuleIdsCallback) {
                                        async.each(moduleIdArray,
                                            function (moduleId, addModuleIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'modules': moduleId}}
                                                    , function (err, data) {
                                                        addModuleIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addModuleIdsCallback();
                                            });
                                    });
                                }

                                //if remove modules, loop and remove
                                if (removeModuleIdArray) {
                                    asyncTasks.push(function (removeModuleIdsCallback) {
                                        async.each(removeModuleIdArray,
                                            function (removeModuleId, removeModuleIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'modules' : removeModuleId} }
                                                    , function(err, data) {
                                                        removeModuleIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removeModuleIdsCallback();
                                            });
                                    });
                                }

                                //if plan subscriptions exists, loop and insert
                                if (planSubscriptionIdArray) {
                                    asyncTasks.push(function (addPlanSubscriptionIdsCallback) {
                                        async.each(planSubscriptionIdArray,
                                            function (planSubscriptionId, addPlanSubscriptionIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , {$addToSet: {'plan_subscriptions': planSubscriptionId}}
                                                    , function (err, data) {
                                                        addPlanSubscriptionIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                addPlanSubscriptionIdsCallback();
                                            });
                                    });
                                }

                                //if remove plan subscriptions, loop and remove
                                if (removePlanSubscriptionIdArray) {
                                    asyncTasks.push(function (removePlanSubscriptionIdsCallback) {
                                        async.each(removePlanSubscriptionIdArray,
                                            function (removePlanSubscriptionId, removePlanSubscriptionIdCallback) {
                                                entityModel.update(
                                                    queryParms
                                                    , { $pull : {'plan_subscriptions' : removePlanSubscriptionId} }
                                                    , function(err, data) {
                                                        removePlanSubscriptionIdCallback();
                                                    });
                                            },
                                            function (err) {
                                                removePlanSubscriptionIdsCallback();
                                            });
                                    });
                                }

                                async.parallel(asyncTasks, function(){
                                    updateReferencesCallback();
                                });
                            }else{
                                updateReferencesCallback();
                            }
                        }*/]
                    , function (err) {
                        if (err){
                            apiHelper.updateRes(req, res, err, null, null, callback);
                        }else{
                            var numberAffected = null;
                            if (updateEntityObj) numberAffected = updateEntityObj.nModified;
                            apiHelper.updateRes(req, res, null, updateEntityObj, numberAffected, callback);
                        }
                    });
            } else {
                apiHelper.apiResponse(req, res, true, 500, "Missing Parameters", null, null, null, callback);
            }
        } else {
            apiHelper.apiResponse(req, res, true, 401, "Not Authorized", null, null, null, callback);
        }
    //});
};

var deleteEntity = exports.deleteEntity = function(req, res, override, callback){
    //authorizationHelper.authorize(req, res, [__ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.body.EntityId
            ) {
                var queryParms = {};
                if (req.body.EntityId) queryParms._id = req.body.EntityId;

                var entityModel = mongoose.model('entity');
                entityModel.remove(queryParms).exec(function (err, numberRemoved) {
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
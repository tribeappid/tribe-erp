/*
 * Authorization Helper
 *
 * Copyright 2017 Tribe App Indonesia
 *
 * Version 1.0.0
 *
 * Change Log
 * ----------
 * 
 *
 */

// Helpers
// var jwtHelper = _require('/helpers/jwt')
// , apiHelper = _require('/helpers/api')
// , trackingHelper = _require('/helpers/tracking')
// Controllers
// , entityController = _require('/routes/m-core/entity')
// , entityRelationshipController = _require('/routes/m-core/entityRelationship')
// , enterpriseRelationshipController = _require('/routes/m-core/enterpriseRelationship');
// Config
var enterpriseWhiteList = config.authorization.enterpriseWhiteList;

// DEPRECATE LATER
exports.authorizationLevels = function(req, res, levelRequired){
    if (req.session.authorizationLevel < levelRequired || !req.session.authorizationLevel){
        // user is not allowed to view the page, redirect to illegal page
        res.redirect('/error/401');
    }
};

// DEPRECATE LATER
exports.alreadyAuthorized = function (req, res, redirectionPage){
    if (req.session.authorizationLevel){
        // if user is authenticated, redirect user to the page
        res.redirect(redirectionPage);
    }
};

// DEPRECATE LATER
exports.authorizeApi = function (req, res, authLevel, bypass, callback, enterpriseRestriction){
    var token = null;
    var appId = null;
    var secret = null;

    // if admin bypass
    if (bypass){
        callback();
        return;
    }

    // authentication for those without logged in
    if (req.body.Token) token = req.body.Token;
    if (req.body.AppToken) token = req.body.AppToken;
    if (req.body.AppId) appId = req.body.AppId;
    if (req.query.Token) token = req.query.Token;
    if (req.query.AppToken) token = req.query.AppToken;
    if (req.query.AppId) appId = req.query.AppId;

    if (token && appId){
        var queryParms = {};
        queryParms.token = token;
        queryParms._id = appId;
        // count the total number of rows.
        mongodb.model('cloud_access')
            .find(queryParms)
            .select({
                '__v' : 0
            })
            .exec(function(err, data){
                if (!err && data.length) {
                    secret = _.first(data).secret;
                    var decodedObject = jwtHelper.jwtDecode(req, res, token, secret);
                    // for enterprises
                    if (decodedObject.EnterpriseId){
                        // check for enterprise restriction over here
                        var authorizedEnterprise = false;

                        if (enterpriseRestriction && _.isArray(enterpriseRestriction) && !_.isEmpty(enterpriseRestriction)){
                            _.each(enterpriseRestriction, function(enterpriseId){
                                if (enterpriseId == decodedObject.EnterpriseId) authorizedEnterprise = true;
                            })
                        }else{
                            authorizedEnterprise = true;
                        }
                        callback(null, authLevel);
                    } else {
                        apiHelper.apiRes(req, res, null, null, null, "Unauthorized", 401);
                    }
                }else{
                    apiHelper.apiRes(req, res, null, null, null, "Unauthorized", 401);
                }
            });
    }else if (req.session.authorizationLevel && (req.session.authorizationLevel >= authLevel)) {
        // authentication for the logged in
        callback(null, authLevel);
        return;
    }else{
        apiHelper.apiRes(req, res, null, null, null, "Unauthorized", 401);
    }

}

var roleBaseAuthorization = function(req, res, targetResourceEntityId, targetResourceEnterpriseId, targetResourceCondominiumId, targetResourceApartmentId, callback){
    var authorized = false;

    var entityId = req.session.entityId;
    var enterpriseId = req.session.enterpriseId;
    var enterpriseIds = [enterpriseId];
    var authorizationLevel = req.session.authorizationLevel;
    var entityIds = [];
    var condominiumIds = [];
    var apartmentIds = [];
    var entityApartmentIds = [];

    var relatedResources = [];

    async.waterfall([
        function(getTargetEntityDetailsCallback){
            // get the details of the target resource entity;
            if (targetResourceEntityId){
                var getTargetEntityReq = _.clone(req);
                getTargetEntityReq.query = {};
                getTargetEntityReq.query.EntityId = targetResourceEntityId;
                entityController.getEntity(getTargetEntityReq, res, true, function(err, data, dataLength){
                    if (!err && dataLength){
                        var entity = _.first(data);
                        var enterprise = null;
                        if (entity) {
                            enterprise = entity.enterprise;
                            if (entity.apartments && _.isArray(entity.apartments))
                            {
                                _.each(entity.apartments, function(apartment){
                                    condominiumIds.push(apartment.condominium);
                                })
                            }
                            if (entity.condominium)
                                condominiumIds.push(entity.condominium);            
                        }
                        if (enterprise && _.isObject(enterprise) && enterprise._id) targetResourceEnterpriseId = enterprise._id;
                        getTargetEntityDetailsCallback();
                    }else{
                        getTargetEntityDetailsCallback(err);
                    }
                })
            }else{
                getTargetEntityDetailsCallback();
            }
        }
        , function(getTargetEnterpriseDetailsCallback){
            if (targetResourceEnterpriseId){
                var getTargetEnterpriseReq = _.clone(req);
                getTargetEnterpriseReq.query = {};
                getTargetEnterpriseReq.query.EnterpriseId = targetResourceEnterpriseId;
                enterpriseController.getEnterprise(getTargetEnterpriseReq, res, true, function(err, data, dataLength){
                    if (!err && dataLength){
                        var enterprise = _.first(data);
                        var entities = null;
                        var condominiums = null;
                        if (enterprise)
                        {
                            entities = enterprise.entities;
                            condominiums = enterprise.condominiums;
                        }
                        
                        if (entities && _.isArray(entities)) {
                            _.each(entities, function(entity){
                                entityIds.push(entity._id);
                            })
                        }
                        if (condominiums && _.isArray(condominiums)) {
                            _.each(condominiums, function(condominium){
                                condominiumIds.push(condominium);
                            })
                        }                        
                        getTargetEnterpriseDetailsCallback();
                    }else{
                        getTargetEnterpriseDetailsCallback(err);
                    }
                })
            }else{
                getTargetEnterpriseDetailsCallback();
            }
        }
        , function(getTargetResourceEnterpriseIdCallback){
            if (!targetResourceEnterpriseId && enterpriseId) targetResourceEnterpriseId = enterpriseId;
            getTargetResourceEnterpriseIdCallback();
        }
        , function(getRelatedEnterpriseResourceCallback){
            if (targetResourceEnterpriseId) {
                var getRelatedEnterpriseReq = _.clone(req);
                getRelatedEnterpriseReq.query = {};
                getRelatedEnterpriseReq.query.Enterprise = enterpriseId;

                var options = {};
                options.queryParms = {};
                options.queryParms.$or = [
                    {"type" : "S", "enterprise" : enterpriseId },
                    {"type" : "M", "related_enterprise" : enterpriseId },
                    {"type" : "M", "enterprise" : enterpriseId }
                ];
                enterpriseRelationshipController.getEnterpriseRelationship(getRelatedEnterpriseReq, res, true, function(err, data, dataLength){
                    if (!err){
                        if (dataLength){
                            _.each(data, function(enterpriseRelationship){
                                if (enterpriseRelationship.type == 'S'){ // single relationship, use only the related_enterprise
                                    if (enterpriseRelationship.related_enterprise && _.isObject(enterpriseRelationship.related_enterprise) && enterpriseRelationship.related_enterprise._id) enterpriseIds.push(enterpriseRelationship.related_enterprise._id);
                                }else if (enterpriseRelationship.type == 'M') { // mutual relationship, use either the related_enterprise / enterprise
                                    if (enterpriseRelationship.enterprise && _.isObject(enterpriseRelationship.enterprise) && enterpriseRelationship.enterprise._id == enterpriseRelationship.enterprise._id == req.session.enterpriseId) enterpriseIds.push(enterpriseRelationship.related_enterprise._id);
                                    if (enterpriseRelationship.related_enterprise && _.isObject(enterpriseRelationship.related_enterprise) && enterpriseRelationship.related_enterprise._id == enterpriseRelationship.enterprise._id == req.session.enterpriseId) enterpriseIds.push(enterpriseRelationship.enterprise._id);
                                }
                            })
                        }
                    }
                    getRelatedEnterpriseResourceCallback();
                }, options);
            }else{
                getRelatedEnterpriseResourceCallback();
            }
        }
        , function(getRelatedEntityResourceCallback){
            // get the resource's  details
            var getEntityRelationshipReq = _.clone(req);
            getEntityRelationshipReq.query = {};
            getEntityRelationshipReq.query.Entity = entityId;
            entityRelationshipController.getEntityRelationship(getEntityRelationshipReq, res, true, function(err, data, dataLength){
                if (!err){
                    if (dataLength){
                        _.each(data, function(relationship){
                            var relatedEntity = relationship.related_entity;
                            if (relatedEntity && _.isObject(relatedEntity) && relatedEntity._id) relatedResources.push(relatedEntity._id);
                        })
                    }
                    getRelatedEntityResourceCallback();
                }else{
                    getRelatedEntityResourceCallback(err);
                }
            })
        }
        , function(getTargetCondominiumCallback){
            if (targetResourceCondominiumId){
                var getCondominiumReq = _.clone(req);
                getCondominiumReq.query = {};
                getCondominiumReq.query.EnterpriseId = enterpriseId;
                getCondominiumReq.query.CondominiumId = targetResourceCondominiumId;
                condominiumController.getCondominium(getCondominiumReq, res, true, function(err, data, dataLength){
                    if (!err && dataLength){
                        condominiumIds.push(_.first(data)._id);
                        getTargetCondominiumCallback();
                    }else{
                        getTargetCondominiumCallback(err);
                    }
                })
            }else{
                getTargetCondominiumCallback();
            }
        }
        , function(getTargetApartmentCallback){
            if (targetResourceApartmentId){
                var getApartmentReq = _.clone(req);
                getApartmentReq.query = {};
                getApartmentReq.query.ApartmentId = targetResourceApartmentId;
                apartmentController.getApartment(getApartmentReq, res, true, function(err, data, dataLength){
                    if (!err && dataLength){
                        condominiumIds.push(_.first(data).condominium._id);
                        getTargetApartmentCallback();
                    }else{
                        getTargetApartmentCallback(err);
                    }
                })
            }else{
                getTargetApartmentCallback();
            }
        }                  
        , function(resourceAuthorizationCallback){
            // check the authorizations
            if (_.indexOf([__USER_AUTH, __GUEST_AUTH], authorizationLevel) != -1){

                // User and guests can only access and alter their own resources
                // If user does not pass in targetResourceEntityId, its a shared resource
                if (!targetResourceEntityId || (targetResourceEntityId && targetResourceEntityId && entityId == targetResourceEntityId)) authorized = true;

            }else if (_.indexOf([__ATTHINGS_USER_AUTH], authorizationLevel) != -1){

                if (!targetResourceEntityId || ((targetResourceEntityId || relatedResources.length) && (entityId == targetResourceEntityId || _.indexOf(relatedResources, targetResourceEntityId) != -1)) || (targetResourceEnterpriseId && _.indexOf(entityIds, entityId) != -1) ) authorized = true;

            }else if (_.indexOf([__CONDOMINIUM_OFFICER_AUTH], authorizationLevel) != -1){
                if (req.session.condominiumId && _.indexOf(condominiumIds, req.session.condominiumId) != -1)
                {
                    authorized = true;
                }
                    
            }else if (_.indexOf([__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH], authorizationLevel) != -1){

                if (targetResourceCondominiumId)
                {
                    if (_.indexOf(condominiumIds, targetResourceCondominiumId) != -1)
                    {
                        authorized = true;    
                    }
                }                
                else if (targetResourceEnterpriseId && _.indexOf(enterpriseIds, targetResourceEnterpriseId) != -1) authorized = true;

            }else if(_.indexOf([__SYS_ADMIN_AUTH, __ADMIN_AUTH], authorizationLevel) != -1){

                authorized = true;

            }

            resourceAuthorizationCallback();
        }
    ], function(err){
        if (err) console.log(err);
        callback(authorized);
    })
};

// Check if a user is authorized to view the page. Returns only true and false
exports.authorizePage = function(req, res, requiredAuthLevel, targetResourceEntityId, targetResourceEnterpriseId, callback){
    var authorized = false;

    if (req.session.authorizationLevel && _.isArray(requiredAuthLevel) && (_.indexOf(requiredAuthLevel, req.session.authorizationLevel) != -1)) {

        var condominiumId = null;
        var apartmentId = null;

        if (req.params.condominium)
        {
            condominiumId = req.params.condominium;            
        }
        if (req.params.apartment)
        {
            apartmentId = req.params.apartment;
        }

        if (!targetResourceEntityId && !targetResourceEnterpriseId){

            // Condominium Resources
            if (condominiumId)
            {
                roleBaseAuthorization(req, res, targetResourceEntityId, targetResourceEnterpriseId, condominiumId, apartmentId, function(authorized){
                    callback(authorized);
                });                    
            }
            else
            {
                authorized = true;
                callback(authorized);    
            }
        }else{
            roleBaseAuthorization(req, res, targetResourceEntityId, targetResourceEnterpriseId, condominiumId, apartmentId, function(authorized){
                callback(authorized);
            })
        }
    } else if (!req.session.authorizationLevel && (_.indexOf(requiredAuthLevel, 0) != -1)){
        // public access
        authorized = true;
        callback(authorized);
    } else {
        callback(authorized);
    }
};

exports.getRootPage = function(req, res, authorizationLevel){
    var rootPage = config.authorization[authorizationLevel];
    
    if (_.indexOf([__CONDOMINIUM_OFFICER_AUTH], authorizationLevel) != -1)
    {
        rootPage += req.session.condominiumId;
    }
    else if (_.indexOf([__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH], authorizationLevel) != -1)
    {
        rootPage += req.session.enterpriseId;
    }
    return rootPage;
};

exports.authorize = function (req, res, requiredAuthLevel, targetResourceEntityId, targetResourceEnterpriseId, override, callback){
    var token = null;
    var condominiumId = null;
    var apartmentId = null;
    var authorized = false;

    // get the header authentication
    if (req.headers) var header = req.headers['authorization'] || null; // get the header
    if (header) token = header.split(/\s+/).pop() || null; // and the encoded auth token

    // Legacy token authentication. To be deprecated in june.
    if (req.body && req.body.Token) token = req.body.Token;
    if (req.body && req.body.AppToken) token = req.body.AppToken;
    if (req.query && req.query.Token) token = req.query.Token;
    if (req.query && req.query.AppToken) token = req.query.AppToken;

    if (req.body && req.body.CondominiumId) condominiumId = req.body.CondominiumId;
    if (req.query && req.query.CondominiumId) condominiumId = req.query.CondominiumId;
    if (req.body && req.body.ApartmentId) apartmentId = req.body.ApartmentId;
    if (req.query && req.query.ApartmentId) apartmentId = req.query.ApartmentId;

    var enterpriseId = null;
    var authLevel = null;

    if (req.session && req.session.authorizationLevel) authLevel = req.session.authorizationLevel; // auth controls

    async.waterfall([
        function(checkResourceEntityIdIsThirdPartyCallback){
            // check if target resource entity ID is passed in as a ThirdPartyId
            var targetResourceEntityIdLower = null;
            if (targetResourceEntityId) {
                targetResourceEntityIdLower = targetResourceEntityId.toLowerCase();
                var getTargetResourceViaTpIdReq = _.clone(req);
                getTargetResourceViaTpIdReq.query = {};
                getTargetResourceViaTpIdReq.query.ThirdPartyId = targetResourceEntityIdLower;
                entityController.getEntity(getTargetResourceViaTpIdReq, res, true, function(err, data, dataLength){
                    if (!err && dataLength) {
                        var entity = _.first(data);
                        if (entity && entity._id) targetResourceEntityId = entity._id;
                    }
                    checkResourceEntityIdIsThirdPartyCallback();
                })
            }else{
                checkResourceEntityIdIsThirdPartyCallback();
            }
        }
    ], function(){
        // if admin bypass
        if (override){
            authorized = true;
            callback(authorized, enterpriseId, authLevel);
        }else{
            if (token){
                // access via access token
                var queryParms = {};
                queryParms.token = token;
                // count the total number of rows.
                mongodb.model('cloud_access')
                    .find(queryParms)
                    .select({
                        '__v' : 0
                    })
                    .exec(function(err, data){
                        if (!err && data.length) {
                            var secret = _.first(data).secret;
                            var decodedObject = jwtHelper.jwtDecode(req, res, token, secret);
                            // for enterprises
                            if (decodedObject.EnterpriseId){
                                authorized = true;
                                if ((_.indexOf(enterpriseWhiteList, decodedObject.EnterpriseId) == -1)) enterpriseId = decodedObject.EnterpriseId; // enterprise ID control via access token
                                callback(authorized, enterpriseId, authLevel);
                            } else {
                                callback(authorized, enterpriseId, authLevel);
                            }
                        }else{
                            callback(authorized, enterpriseId, authLevel);
                        }
                    });

            } else if (req.session.authorizationLevel && _.isArray(requiredAuthLevel) && (_.indexOf(requiredAuthLevel, req.session.authorizationLevel) != -1)) {
                // access via log in session
                roleBaseAuthorization(req, res, targetResourceEntityId, targetResourceEnterpriseId, condominiumId, apartmentId, function(authorized){
                    enterpriseId = targetResourceEnterpriseId;
                    callback(authorized, enterpriseId, authLevel);
                })
            } else if (!req.session.authorizationLevel && (_.indexOf(requiredAuthLevel, 0) != -1)){
                // public access
                authorized = true;
                callback(authorized, enterpriseId, authLevel);
            }else{
                authorized = false;
                callback(authorized, enterpriseId, authLevel);
            }
        }
    })
};
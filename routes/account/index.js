var router = express.Router();

/* Register user */
router.post('/register', function(req, res, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.body.AuthenticationString && 
                req.body.Password &&
                (req.body.FirstName ||
                req.body.LastName ||
                req.body.Name)
            ) {
                    //check if user exists
                    async.waterfall([
                        function(checkExistCallback) {
                            var getEntityReq = _.clone(req);             
                            getEntityReq.query = {};
                            getEntityReq.query.AuthenticationString = req.body.AuthenticationString;
                            entityController.getEntity(req, res, true, function(resGetEntityErr, resGetEntity, resGetEntityRowsReturned, resGetEntityTotalRows){
                                if (!resGetEntityErr && resGetEntity){
                                    checkExistCallback('User Exists');
                                }else{
                                    checkExistCallback();
                                }
                            });
                        }
                    ], function (err) {
                        if (!err)
                        {
                            var addEntityReq = _.clone(req);             
                            entityController.addEntity(addEntityReq, res, true, function(err, data){
                                if (!err){
                                    apiHelper.addRes(req, res, null, data, callback);
                                }else{
                                    apiHelper.addRes(req, res, err, null, callback);
                                }
                            });        
                        }
                        else
                        {
                            apiHelper.apiResponse(req, res, true, 500, err, null, null, null, null);
                        }
                    });
            } else {
                apiHelper.apiResponse(req, res, true, 500, "Missing Parameter", null, null, null, null);
            }
        } else {
            apiHelper.apiResponse(req, res, true, 401, "Not Authorized", null, null, null, null);
        }
    //});
});

router.get('/profile', function(req, res, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.query.EntityId
            ) {
                    var getEntityReq = _.clone(req);             
                    getEntityReq.query = {};
                    getEntityReq.query.EntityId = req.query.EntityId;
                    entityController.getEntity(req, res, true, function(resGetEntityErr, resGetEntity, resGetEntityRowsReturned, resGetEntityTotalRows){
                        if (!resGetEntityErr){
                            apiHelper.apiRes(req, res, null, null, resGetEntity, null, null, null);
                        }else{
                            apiHelper.apiRes(req, res, null, null, null, resGetEntityErr, null, null);
                        }
                    });
            } else {
                apiHelper.apiResponse(req, res, true, 500, "Missing Parameter", null, null, null, null);
            }
        } else {
            apiHelper.apiResponse(req, res, true, 401, "Not Authorized", null, null, null, null);
        }
    //});
});

router.post('/login', function(req, res, callback){
    if (
        (req.body.AuthenticationString && req.body.Password)
    ){
        var authenticationString = null;
        var password = null;

        if (req.body.AuthenticationString){
            authenticationString = req.body.AuthenticationString.toLowerCase();
        }

        if (req.body.Password){
            password = req.body.Password;
        }

        var authenticatedEntity = null;
        var authenticationEntityId = null;
        var failedAuthenticationAttempts = 0;
        async.waterfall([
            function(getEntityDetailsCallback){
                // get the user record
                req, req.query = {};

                var options = {};
                options.entityFields = {};
                options.entityFields._id = 1;
                options.entityFields.first_name = 1;
                options.entityFields.last_name = 1;
                options.entityFields.name = 1;
                options.entityFields.medias = 1;
                options.entityFields.address = 1;
                options.entityFields.phone = 1;
                options.entityFields.status = 1;
                options.entityFields.approved = 1;
                options.entityFields.disabled = 1;
                options.entityFields.type = 1;
                options.entityFields.hash = 1;
                options.entityFields.date_established = 1;
                options.entityFields.authorization_level = 1;
                options.entityFields.enterprise = 1;
                options.entityFields.referral_code = 1;
                options.entityFields.referred_by = 1;
                options.entityFields.authentication_attempts = 1;

                options.enterpriseFields = {};
                options.enterpriseFields._id = 1;
                options.enterpriseFields.name = 1;

                options.referredByFields = {};
                options.referredByFields._id = 1;
                options.referredByFields.name = 1;
                options.referredByFields.authentication_string = 1;
                options.referredByFields.name = 1;

                options.mediasFields = {};
                options.mediasFields._id = 1;
                options.mediasFields.img_url = 1;
                options.mediasFields.img_url2 = 1;
                options.mediasFields.img_url3 = 1;
                options.mediasFields.img_url4 = 1;
                options.mediasFields.media_url = 1;

                entityController.getEntity(req, res, true, function(resGetEntityErr, resGetEntity, resGetEntityRowsReturned, resGetEntityTotalRows){
                    if (!resGetEntityErr){

                        if (resGetEntityRowsReturned){
                            // get the hash of the user
                            var entity = _.first(resGetEntity);
                            var hash = entity.hash;
                            var disabled = entity.disabled;
                            authenticationEntityId = entity._id;
                            if (entity.authentication_attempts) failedAuthenticationAttempts = entity.authentication_attempts;

                            var authenticated = false;

                            if (authenticationString && password) authenticated = cryptHelper.decryptBCrypt(req, res, password, hash);

                            authenticatedEntity = _.omit(_.first(resGetEntity), 'hash'); // remove the hash from the returned values for security reasons

                            if (authenticated){

                                if (!disabled){
                                    getEntityDetailsCallback();
                                }else{
                                    if (failedAuthenticationAttempts >= 5){
                                        getEntityDetailsCallback('Due to security reasons your account is locked after ' + failedAuthenticationAttempts + ' failed log in attempts. Please contact the administrator via info@astralink.com.sg');
                                    }else {
                                        getEntityDetailsCallback('Your account is disabled. Please contact sales via info@astralink.com.sg for account provisioning and activation');
                                    }
                                }
                            }else{
                                if (failedAuthenticationAttempts >= 5){
                                    getEntityDetailsCallback('Due to security reasons your account is locked after ' + failedAuthenticationAttempts + ' failed log in attempts. Please contact the administrator via info@astralink.com.sg');
                                }else {
                                    getEntityDetailsCallback('Authentication failed');
                                }
                            }
                        }else{
                            getEntityDetailsCallback('Authentication failed');
                        }
                    }else{
                        getEntityDetailsCallback(resGetEntityErr);
                    }
                }, options)
            }
        ], function(err){
            if (!err){
                // clear the user's authentication attempts
                /*
                var updateFailedAttemptsReq = _.clone(req);
                updateFailedAttemptsReq.body = {};
                updateFailedAttemptsReq.body.AuthenticationAttempts = "";
                updateFailedAttemptsReq.body.EntityId = authenticationEntityId;
                entityController.updateEntity(updateFailedAttemptsReq, res, true, function(resUpdateEntityErr){
                    if (!resUpdateEntityErr){
                        apiHelper.apiRes(req, res, null, null, [authenticatedEntity], null, null, callback);
                    }else{
                        apiHelper.apiRes(req, res, null, null, null, resUpdateEntityErr, null, callback);
                    }
                });
                */
                console.log(res);
               apiHelper.apiRes(req, res, null, null, [authenticatedEntity], null, null, null);
            }else{
                // update the user's authentication attempts
                /*
                if (authenticationEntityId && err){
                    failedAuthenticationAttempts += 1;
                    var updateFailedAttemptsReq = _.clone(req);
                    updateFailedAttemptsReq.body = {};
                    updateFailedAttemptsReq.body.AuthenticationAttempts = failedAuthenticationAttempts;
                    updateFailedAttemptsReq.body.EntityId = authenticationEntityId;
                    if (failedAuthenticationAttempts >= 5) updateFailedAttemptsReq.body.Disabled = true;

                    entityController.updateEntity(updateFailedAttemptsReq, res, true, function(resUpdateEntityErr){
                        if (!resUpdateEntityErr){
                            apiHelper.apiRes(req, res, null, null, null, err, null, callback);
                        }else{
                            apiHelper.apiRes(req, res, null, null, null, resUpdateEntityErr, null, callback);
                        }
                    })
                }else{
                    apiHelper.apiRes(req, res, null, null, null, err, null, callback);
                }
                */
               apiHelper.apiRes(req, res, null, null, null, err, null, null);
            }
        });
    }else{
        apiHelper.apiRes(req, res, null, null, null, 'Parameters Required', 500, null);
    }
});

router.get('/list', function(req, res, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            req, req.query = {};

            var options = {};
            options.entityFields = {};
            options.entityFields._id = 1;
            options.entityFields.first_name = 1;
            options.entityFields.last_name = 1;
            options.entityFields.name = 1;
            options.entityFields.medias = 1;
            options.entityFields.address = 1;
            options.entityFields.phone = 1;
            options.entityFields.status = 1;
            options.entityFields.approved = 1;
            options.entityFields.disabled = 1;
            options.entityFields.type = 1;
            options.entityFields.hash = 1;
            options.entityFields.date_established = 1;
            options.entityFields.authorization_level = 1;
            options.entityFields.enterprise = 1;
            options.entityFields.referral_code = 1;
            options.entityFields.referred_by = 1;
            options.entityFields.authentication_attempts = 1;

            options.enterpriseFields = {};
            options.enterpriseFields._id = 1;
            options.enterpriseFields.name = 1;

            options.mediasFields = {};
            options.mediasFields._id = 1;
            options.mediasFields.img_url = 1;
            options.mediasFields.media_url = 1;

            entityController.getEntity(req, res, true, function(resGetEntityErr, resGetEntity, resGetEntityRowsReturned, resGetEntityTotalRows){
                if (!resGetEntityErr){
                    apiHelper.apiRes(req, res, null, null, resGetEntity, null, null, null);
                }else{
                    getEntityDetailsCallback(resGetEntityErr);
                }
            }, options)
        } else {
            apiHelper.apiResponse(req, res, true, 401, "Not Authorized", null, null, null, null);
        }
    //});
});

module.exports = router;

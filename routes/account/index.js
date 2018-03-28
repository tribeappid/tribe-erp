var router = express.Router();

var upload = multer({ dest: 'upload/userprofile' });

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
                            entityController.getEntity(getEntityReq, res, true, function(resGetEntityErr, resGetEntity, resGetEntityRowsReturned, resGetEntityTotalRows){
                                if (!resGetEntityErr && !_.isEmpty(resGetEntity)){
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
                options.entityFields.authentication_string = 1;

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
            options.entityFields.date_established = 1;
            options.entityFields.authorization_level = 1;
            options.entityFields.enterprise = 1;
            options.entityFields.referral_code = 1;
            options.entityFields.referred_by = 1;
            options.entityFields.authentication_attempts = 1;
            options.entityFields.authentication_string = 1;

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

router.post('/userprofile', upload.single('image'), function(req, res){

    console.log(req.file);
    if (req.body.EntityId && req.file)
    {
        var mime_type = 'image/jpeg';
        var target_path = null;

        async.waterfall([
            function (getEntityCallback) {
                var getEntityReq = _.clone(req);             
                getEntityReq.query = {};
                getEntityReq.query.EntityId = req.query.EntityId;
                entityController.getEntity(req, res, true, function(resGetEntityErr, resGetEntity, resGetEntityRowsReturned, resGetEntityTotalRows){
                    if (!resGetEntityErr){
                        getEntityCallback();
                    }else{
                        getEntityCallback(resGetEntityErr);
                    }
                });        
            },
            function(uploadCallback) {
                var tmp_path = req.file.path;
                var extension = path.extname(req.file.originalname);
                
                mime_type = req.file.mimetype;
                target_path = "upload/userprofile/" + req.body.EntityId + extension;
                
                var src = fs.createReadStream(tmp_path);
                var dest = fs.createWriteStream(target_path);
        
                src.pipe(dest);
        
                src.on('end', function() { 
                    fs.unlink(tmp_path);
                    uploadCallback();
                });
        
                src.on('error', function(err) { 
                    fs.unlink(tmp_path);
                    uploadCallback("Write File Error");
                });        
            }

        ], function(err) {
            var updateEntityReq = _.clone(req);             
            updateEntityReq.body = {};
            updateEntityReq.body.EntityId = req.body.EntityId;
            updateEntityReq.body.Userprofile = { filename: target_path, mimetype: mime_type};
            entityController.updateEntity(updateEntityReq, res, true, function(err, data){
                if (!err){
                    apiHelper.apiRes(req, res, null, null, data, null, null, null);
                }else{
                    console.log('updating userprofile fail');
                    apiHelper.apiResponse(req, res, true, 500, "Updating Userprofile Fail", null, null, null, null);
                }
            });              
        });

    }
    else
    {
        apiHelper.apiResponse(req, res, true, 500, "Missing Parameter", null, null, null, null);
    }
});

router.get('/userprofile', function(req, res){

    if (req.query.EntityId)
    {
        var entityObj = null;

        async.waterfall([
            function (getEntityCallback) {
                var getEntityReq = _.clone(req);             
                getEntityReq.query = {};
                getEntityReq.query.EntityId = req.query.EntityId;
                entityController.getEntity(req, res, true, function(resGetEntityErr, resGetEntity, resGetEntityRowsReturned, resGetEntityTotalRows){
                    if (!resGetEntityErr){
                        if (resGetEntity && !_.isEmpty(resGetEntity))
                            entityObj = _.first(resGetEntity);
                        getEntityCallback();
                    }else{
                        getEntityCallback(resGetEntityErr);
                    }
                });        
            }
        ], function(err) {
            if (!err && entityObj)
            {
                if (entityObj.userprofile)
                {
                    var target_path = entityObj.userprofile.filename;
                    var mimetype = entityObj.userprofile.mimetype;
                    var src = fs.createReadStream(target_path);
                    src.pipe(res);
                }
                else
                {
                    apiHelper.apiResponse(req, res, true, 500, "Userprofile Not Found", null, null, null, null);
                }
            }
            else
            {
                apiHelper.apiResponse(req, res, true, 500, "Entity Not Found", null, null, null, null);
            }
        });        

    }
    else
    {
        apiHelper.apiResponse(req, res, true, 500, "Missing Parameter", null, null, null, null);
    }

  
});

module.exports = router;

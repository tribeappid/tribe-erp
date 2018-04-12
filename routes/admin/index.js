var router = express.Router();

/* Register user */
router.post('/addEnterprise', function(req, res, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (req.body.Name)
            {
                var addEnterpriseReq = _.clone(req);             
                enterpriseController.addEnterprise(addEnterpriseReq, res, true, function(err, data){
                    if (!err){
                        apiHelper.addRes(req, res, null, data, callback);
                    }else{
                        apiHelper.addRes(req, res, err, null, callback);
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

router.get('/getEnterprise', function(req, res, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.query.EnterpriseId
            ) {
                    var getEntityReq = _.clone(req);             
                    enterpriseController.getEnterprise(req, res, true, function(resGetEntityErr, resGetEntity, resGetEntityRowsReturned, resGetEntityTotalRows){
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

router.post('/addBranch', function(req, res, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (req.body.Name)
            {
                var addBranchReq = _.clone(req);             
                enterpriseController.addBranch(addBranchReq, res, true, function(err, data){
                    if (!err){
                        apiHelper.addRes(req, res, null, data, callback);
                    }else{
                        apiHelper.addRes(req, res, err, null, callback);
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

router.get('/getBranch', function(req, res, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            //if (req.query.EnterpriseId || req.query.BranchId)
            {
                var getBranchReq = _.clone(req);
                enterpriseController.getBranch(getBranchReq, res, true, function(resGetEntityErr, resGetEntity, resGetEntityRowsReturned, resGetEntityTotalRows){
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

router.post('/updateBranch', function(req, res, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (req.body.BranchId)
            {
                var updateBranchReq = _.clone(req);
                enterpriseController.updateBranch(updateBranchReq, res, true, function(resGetEntityErr, resGetEntity, resGetEntityRowsReturned, resGetEntityTotalRows){
                    if (!resGetEntityErr){
                        apiHelper.apiRes(req, res, null, null, resGetEntity, null, null, null);
                    }else{
                        apiHelper.apiRes(req, res, null, null, null, resGetEntityErr, null, null);
                    }
                });
            } else {
                apiHelper.apiResponse(req, res, true, 500, "Missing Parameters", null, null, null, null);
            }
        } else {
            apiHelper.apiResponse(req, res, true, 401, "Not Authorized", null, null, null, null);
        }
    //});
});

router.post('/deleteBranch', function(req, res, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.body.BranchId
            ) {
                    var delBranchReq = _.clone(req);             
                    delBranchReq.body = {};
                    delBranchReq.body.BranchId = req.body.BranchId;
                    enterpriseController.deleteBranch(delBranchReq, res, true, function(resGetEntityErr, data, numberRemoved){
                        if (!resGetEntityErr){
                            apiHelper.apiRes(req, res, null, null, data, null, null, null);
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

module.exports = router;

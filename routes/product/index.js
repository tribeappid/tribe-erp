var router = express.Router();

/* Register user */
router.post('/add', function(req, res, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (req.body.Name && req.body.BranchId)
            {
                var addProductReq = _.clone(req);             
                productController.addProduct(addProductReq, res, true, function(err, data){
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

router.get('/get', function(req, res, callback){
    //authorizationHelper.authorize(req, res, [__ENTERPRISE_ADMIN_AUTH, __ENTERPRISE_SYS_ADMIN_AUTH, __ADMIN_AUTH, __SYS_ADMIN_AUTH], null, null, override, function(authorized){
        if (1) {
            if (
                req.query.ProductId
            ) {
                    var getProductReq = _.clone(req);             
                    productController.getProduct(getProductReq, res, true, function(resGetEntityErr, resGetEntity, resGetEntityRowsReturned, resGetEntityTotalRows){
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

module.exports = router;

/*
 * ID Generator Helper
 *
 * Copyright 2017 Tribe App Indonesia
 *
 * Version 1.0.0
 *
 * Change Log
 * ----------
 *
 */

var generateCharacters = exports.generateCharacters = function(req, res, len, chars){
    var text = "";
    for( var i = 0; i < len; i++ )
        text += chars.charAt(Math.floor(Math.random() * chars.length));

    return text;
}

exports.generateId = function(req, res){
    var rand = generateCharacters(req, res, 8, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var rand2 = generateCharacters(req, res, 8, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var rand3 = generateCharacters(req, res, 8, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');

    var result = rand + "-" + rand2 + "-" + rand3;

    return result;
}

exports.generatePrId = function(req, res){
    var n = moment.utc();
    var idn = n.valueOf() - 1461646336900;
    var result = "PR" + idn;

    return result;
}

exports.generateImageName = function (req, res){
    return generateCharacters(req, res, 20, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
}

exports.generateUserReferralCode = function(req, res, firstName, callback){
    var uniqueCode = false;
    var generatedReferralCode;
    do {
        async.waterfall([
                function(generateCodeCallback){
                    var firstNameString = stringHelper.toAnName(req, res, firstName);
                    var dynamicNoLength = 8
                    if (firstNameString.length > 5) {
                        firstNameString = firstNameString.substring(0, 5);
                    }else{
                        dynamicNoLength = 5 - firstNameString.length + 8;
                    }
                    generatedReferralCode = firstNameString + idGenHelper.generateDynamicId(req, res, dynamicNoLength);
                    generatedReferralCode = generatedReferralCode.toLowerCase();
                    generateCodeCallback();
                }
                , function(checkForReferralUniqueCodeCallback){
                    var getEntityReq = _.clone(req);
                    getEntityReq.query = {};
                    getEntityReq.query.ReferralCode = generatedReferralCode;
                    entityController.getEntity(getEntityReq, res, true, function(err, data, dataLength){
                        if (!err && !dataLength) uniqueCode = true;
                        checkForReferralUniqueCodeCallback();
                    })
                }
            ]
            , function(err){
                callback(generatedReferralCode);
            })
    } while (uniqueCode)
}

exports.generateDynamicId = function (req, res, len){
    var id;
    if (len && len > 5) id = generateCharacters(req, res, len, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    return id;
}
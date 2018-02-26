/*
 * Cryptography Helper
 *
 * Copyright 2017 Tribe App Indonesia
 * 
 * Version 1.0
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

exports.cloudAccessSecretGen = function (req, res){
    return generateCharacters(req, res, 20, '0123456789abcdefghijklmnopqrstuvwxyz');
}

exports.lifetouchSecretGen = function (req, res, deviceId){

    var deviceSecret = null;
    if (deviceId && deviceId.length == 12 && deviceId.substring(1, 5) == "0a78") {
        var prefix = generateCharacters(req, res, 6, '0123456789abcdefghijklmnopqrstuvwxyz')
        deviceSecret = {};
        deviceSecret.secret = prefix + deviceId.substring(2);
        deviceSecret.prefix = prefix;
    }
    return deviceSecret;
}

var lifetouchAESIvGen = exports.lifetouchAESIvGen = function (req, res, secret){

    var deviceAESIv = null;
    if (secret) deviceAESIv = secret.split("").reverse().join("");
    return deviceAESIv;
}

exports.generateSipPassword = function (req, res){
    return generateCharacters(req, res, 8, '0123456789abcdefghijklmnopqrstuvwxyz');
}

exports.encryptBCrypt = function(req, res, string){
    if (string){
        var hash = bcrypt.hashSync(string, 10);
        return hash;
    }else{
        return false;
    }
}

exports.decryptBCrypt = function(req, res, string, hash){
    if (string && hash){
        var match = bcrypt.compareSync(string, hash);
        if (match){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

exports.encryptAES = function(req, res, data, secret, iv){

    // Encrypt
    var cipherText = null;
    if (iv && secret) {
        if (_.isObject(data)) data = JSON.stringify(data);
        secret = cryptoJs.enc.Utf8.parse(secret);
        iv = cryptoJs.enc.Utf8.parse(iv);
        cipherText = cryptoJs.AES.encrypt(data, secret, { iv: iv, padding: cryptoJs.pad.ZeroPadding, mode: cryptoJs.mode.CBC});
        cipherText = cryptoJs.enc.Base64.stringify(cipherText.ciphertext);
    }
    return cipherText;

}

var decryptAES = exports.decryptAES = function(req, res, cipherText, isObject, secret, iv){
    // Decrypt
    var decryptedData = null;

    if (secret && iv){
        secret = cryptoJs.enc.Utf8.parse(secret);
        iv = cryptoJs.enc.Utf8.parse(iv);

        var cbcDecryptedData = cryptoJs.AES.decrypt(cryptoJs.enc.Base64.stringify(cryptoJs.enc.Hex.parse(cipherText)), secret, { iv: iv, padding: cryptoJs.pad.ZeroPadding, mode: cryptoJs.mode.CBC});
        try{
            cbcDecryptedData = cbcDecryptedData.toString(cryptoJs.enc.Utf8)
        }catch(err){
            // forming UTF String
            cbcDecryptedData = null;
        }

        if (isObject && cbcDecryptedData){
            try {
                decryptedData = JSON.parse(cbcDecryptedData);
            }catch(err) {
                // replace trailing whitespaces
                decryptedData = cbcDecryptedData.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, "");
                decryptedData = JSON.parse(decryptedData);
            }
        }else{
            decryptedData = cbcDecryptedData;
        }
    }
    return decryptedData;

}

exports.decryptApi = function(req, res, encryptedApiType, enforceEncryption, callback){

    // encrypted post comes with a payload and an identifier
    // req.body.Payload = U2FsdGVkX1+8qucYyaQrQfW8owzcEgJ+jDkvlSZEBlFJmkMm+EJH3xFpNMRPsZxw0lwfK+vzNZU6/792Ea8JIw==
    // req.body.Identifier = any string
    // req.body.IdentificationType = D - Device

    // Encryption Type - AES
    // Enforce - true/false, able to fall back to normal post

    var payload = null;
    var secret = null;
    var deviceIsSecured = null;
    var decryptedPayload = req.body;
    var identifier = null;
    var identificationType = null;

    if (enforceEncryption == null) enforceEncryption = true; // enforce encryption if nothing is passed in

    // encryption or decryption is usually through the POST.
    if (req.body.Payload) payload = req.body.Payload;
    if (req.body.Identifier) identifier = req.body.Identifier;
    if (req.body.IdentificationType) identificationType = req.body.IdentificationType;

    if (payload && identifier && identificationType){
        async.waterfall([
            function(getIdentifierCallback){
              if (identificationType == 'D'){

                  var getDeviceReq = _.clone(req);
                  getDeviceReq.query = {};
                  getDeviceReq.query.DeviceId = identifier;

                  var options = {};
                  options.deviceFields = {};
                  options.deviceFields._id = 1;
                  options.deviceFields.secret = 1;
                  options.deviceFields.secured = 1;

                  deviceController.getDevice(getDeviceReq, res, true, function(resGetDeviceErr, resGetDevice, resGetDeviceRowsReturned){
                    if (!resGetDeviceErr) {
                        if (resGetDeviceRowsReturned){
                            var device = _.first(resGetDevice);
                            secret = "000000" + identifier.substring(2); // default the secret to 000000
                            if (device && _.isObject(device) && device.secret) secret = device.secret;
                            if (device && _.isObject(device) && device.secured) deviceIsSecured = device.secured;
                        }
                        getIdentifierCallback();
                    }else{
                        getIdentifierCallback('Unauthorized');
                    }
                  }, options)
              }else{
                  getIdentifierCallback()
              }
            }
            , function(deviceIsSecuredCheckCallback){
                if (enforceEncryption){
                    if (deviceIsSecured){
                        deviceIsSecuredCheckCallback();
                    }else{
                        deviceIsSecuredCheckCallback('Device not secured');
                    }
                }else{
                    deviceIsSecuredCheckCallback();
                }
            }
            , function(decryptPayloadCallback){
                if (secret){
                    if (encryptedApiType == 'AES'){
                        var iv = lifetouchAESIvGen(req, res, secret);
                        if (iv && secret){
                            decryptedPayload = decryptAES(req, res, payload, true, secret, iv);
                            decryptPayloadCallback();
                        }else{
                            decryptPayloadCallback('Unauthorized');
                        }
                    }else{
                        decryptPayloadCallback('Unauthorized');
                    }
                }else{
                    decryptPayloadCallback('Unauthorized');
                }
            }
        ], function(err){
            if (enforceEncryption){
                if (!err){
                    apiHelper.getRes(req, res, null, decryptedPayload, null, callback)
                }else{
                    apiHelper.getRes(req, res, err, null, null, callback)
                }
            }else{
                apiHelper.getRes(req, res, null, decryptedPayload, null, callback) // skip the decryption
            }
        })
    }else{
        if (enforceEncryption){
            apiHelper.getRes(req, res, "Parameters required", null, null, callback)
        }else{
            apiHelper.getRes(req, res, null, decryptedPayload, null, callback) // skip the decryption
        }
    }
}
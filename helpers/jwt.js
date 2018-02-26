/*
 * JSON Web Token Helper
 *
 * Copyright 2017 Tribe App Indonesia
 *
 * Version 1.0.0
 *
 * Change Log
 * ----------
 *
 */

exports.jwtEncode = function(req, res, payload, secret){
    var encodedPayload = jwt.encode(payload, secret);
    return encodedPayload;
}

exports.jwtDecode = function(req, res, token, secret){
    var payload = null;
    try {
        payload = jwt.decode(token, secret)
    }catch (err){
        console.log(err);
    }
    return payload;
}
/*
 * String Helper
 *
 * Copyright 2017 Tribe App Indonesia
 *
 * Version 1.0.0
 *
 * Change Log
 * ----------
 *
 */

var pluralize = exports.pluralize = function (count, noun) {
    var englishTeacher = noun.substr(noun.length - 1);
    var strictWords = [
        'day'
    ];

    var isStrict = false;
    if(_.indexOf(noun, strictWords) != -1 ){
        isStrict = true;
    }
    if (noun){
        if (count > 1){
            if (!isStrict){
                if (englishTeacher == 'f'){
                    var pos = noun.lastIndexOf('f');
                    noun = noun.substring(0,pos) + 'ves'
                }else if (englishTeacher == 'y'){
                    var pos = noun.lastIndexOf('y');
                    noun = noun.substring(0,pos) + 'ies'
                }else{
                    noun += 's';
                }
            }else{
                noun += 's';
            }
            return noun;
        }else{
            return noun;
        }
    }else{
        return noun;
    }
}

var parseExtraDataToArrayOfObjects = exports.parseExtraDataToArrayOfObjects = function(req, res, extraData){
    if (extraData){
        extraData = ('[{"' + extraData + '"}]').replace(/;/g, '"}, {"');
        extraData = (extraData).replace(/&/g, '" , "');
        extraData = extraData.replace(/:/g, '":"');
        try{
            extraData = JSON.parse(extraData)
        }catch (e){
            extraData = null;
        }
        return extraData;
    }else{
        return null;
    }
}

var toTitle = exports.toTitle = function (req, res, value){
    if (value){
        // strip all the underscores
        var value = value.replace(/_/g, ' ');
        // capitalize
        value = value.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        return value;
    }else{
        return null;
    }
}

var toAnName = exports.toAnName = function (req, res, name){
    var name = name.replace(/\W/g, ''); // remove non alpha numeric
    name = name.replace(/ /g, '-'); // remove spaces
    name = name.toLowerCase(); // lowercase
    return name;
}

var padFront = exports.padFront = function (req, res, num, size){
    var padded = num + "";
    while (padded.length < size) padded = "0" + padded;
    return padded;
}

var toName = exports.toName = function (req, res, firstName, lastName){
    var name = null;
    if (firstName && lastName){
        name = firstName + ' ' + lastName;
    }else if (firstName){
        name = firstName;
    }else if (lastName){
        name = lastName;
    }
    return name;
}

var addressParser = exports.addressParser = function (req, res, apartment, road, road2, suite, city, state, province, country, zip){
    var addressString = '';

    if (apartment) addressString += apartment + " ";
    if (road) addressString += road + " ";
    if (road2) addressString += road2 + " ";
    if (suite) addressString += suite + " ";
    if (city) addressString += city + " ";
    if (state) addressString += state + " ";
    if (province) addressString += province + " ";
    if (country) addressString += country + " ";
    if (zip) addressString += zip + " ";

    if (!addressString){
        addressString = null;
    }

    return addressString;
}

var logTextGeneration = exports.logTextGeneration = function(action, type, entity, targetEntity, device, targetDevice, enterprise, targetEnterprise){

    var logText = null;

    if (action == 'login') {
        logText = entity.name + ' logged in to Lifecare Web Portal.'
    }else if (action == 'logout'){
        logText = entity.name + ' logged out from Lifecare Web Portal.'
    }else if (action == 'app-login'){
        logText = entity.name + ' logged in to Lifecare Mobile App.'
    }else if (action == 'app-logout'){
        logText = entity.name + ' logged out from Lifecare Mobile App.'
    }else if (action == 'request-change-password'){
        logText = entity.name + ' sent a change password request.'
    }else if (action == 'change-password'){
        logText = entity.name + ' has changed his/her password.'
        if (targetEntity) logText =  entity.name + ' changed ' + targetEntity.name  + '\'s password';
    }

    return logText;
}

var parseOriginalDeviceId = exports.parseOriginalDeviceId = function(deviceId){
    if (deviceId && deviceId.length == 12 && deviceId.substring(1, 5) == "0a78"){
        deviceId = "9" + deviceId.substring(1);
        var parsedDeviceId = "";
        _.times(deviceId.length, function(n){
            parsedDeviceId += deviceId.charAt(n);
            if (_.indexOf([1, 3, 5, 7, 9], n) != -1) parsedDeviceId += ":";
        })
        if (parsedDeviceId) parsedDeviceId= parsedDeviceId.toUpperCase();
        deviceId = parsedDeviceId;
    }
    return deviceId;
}

var differenceArrayObjects = exports.differenceArrayObjects = function(array1, array2){
    if (array1 && array2 && _.isArray(array1) && _.isArray(array2)){

        // console.log(array1);
        // console.log(array2);
        var strArray1 = [];
        var strArray2 = [];
        var strDiffArray = [];
        var diffArray = [];

        _.each(array1, function(obj){
            strArray1.push(JSON.stringify(obj));
        })

        _.each(array2, function(obj){
            strArray2.push(JSON.stringify(obj));
        })

        strDiffArray = _.difference(strArray2, strArray1);

        if (strDiffArray && _.isArray(strDiffArray) && !_.isEmpty(strDiffArray)){
            _.each(strDiffArray, function(strObj){
                diffArray.push(JSON.parse(strObj));
            })
        }

        return diffArray;
    }else{
        return null;
    }
}

var parseExtraData = exports.parseExtraData = function(extraData, eventTypeId){
    if (extraData){
        var extraDataRaw = ('{"' + extraData + '"}').replace(/&amp;/g, '" , "');
        extraDataRaw = extraDataRaw.replace(/\n/g, '\\n');
        extraDataRaw = extraDataRaw.replace(/\r/g, '\\r');
        extraDataRaw = extraDataRaw.replace(/&lt;/g, '<');
        extraDataRaw = extraDataRaw.replace(/&gt;/g, '>');
        extraDataRaw = extraDataRaw.replace(/&/g, '" , "');
        extraDataRaw = extraDataRaw.replace(/:/g, '":"');
        if (eventTypeId == '20053' || eventTypeId == 20053) extraDataRaw = extraDataRaw.replace(/"" ,/g, '');
        var extraData = null;
        try{
            extraData = JSON.parse(extraDataRaw);
        }catch(err){
            //forming UTF String
            extraData = {};
            console.log('Error parsing data');
        }
        return extraData;
    }else{
        return null;
    }
}

var passwordGen = exports.passwordGen = function (length, charset) {
    var defLength = 8;
    var defCharset = "0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789";
    var pwString = "";

    if (length) defLength = length;
    if (charset) defCharset = charset;

    for (var i = 0, n = defCharset.length; i < defLength; ++i) {
        pwString += defCharset.charAt(Math.floor(Math.random() * n));
    }

    return pwString;
}

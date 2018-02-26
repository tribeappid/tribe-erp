/*
 * Cloud Access Model
 *
 * Copyright 2017 Tribe App Indonesia
 *
 * Version 1.0.0
 *
 * Change Log
 * ----------
 *
 */

var Schema = mongoose.Schema;

cloudAccessSchema = new Schema({
    _id : {type: String}
    , secret : {type: String, default : null}
    , token : {type: String, default : null}
    , enterprise : {type : String, ref : 'enterprise'}
});

mongoose.model('cloud_access', cloudAccessSchema, 'cloud_access');
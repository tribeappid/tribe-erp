/*
 * Entity Model
 *
 * Copyright 2018 Tribe App Indonesia
 * Author Hendra
 *
 * Version 1.0.0
 * Release date -
 * Released by -
 *
 * Change Log
 * ----------
 *
 */

var Schema = mongoose.Schema;

entitySchema = new Schema({
    _id : {type : String}
    , authentication_string : {type :String, default :null}
    , authentication_string_lower : {type :String, default :null}
    , referral_code : {type :String, default :null}
    , hash : {type :String, default :null}
    , last_login : {type :Date, default :null}
    , last_logout : {type :Date, default :null}
    , last_change_password : {type :Date, default :null}
    , authentication_attempts : {type : Number, default :null}
    , authorization_level : {type : Number, default :null}
    , permission : { type: String, ref: 'permission'}
    , first_name : {type : String, default : null}
    , last_name : {type : String, default : null}
    , name : {type : String, default : null}
    , status : {type : String, default : null}
    , approved : {type : Boolean, default : false}
    , type : {type : String, default : null}
    , create_date : {type : Date, default : null}
    , last_update : {type : Date, default : null}
    , date_established : {type : Date, default : null}
    , disabled : {type: Boolean, default : false}
    , demo : {type: Boolean, default : false}
    , enterprise : { type: String, ref: 'enterprise'}
    , pin : {type: String, default : null}
    , height : {type : String, default : null}
    , referred_by : { type: String, ref: 'entity'}
    , create_date : {type : Date, default : null}
    , medias : {
        type: Schema.Types.ObjectId
        , ref : 'media'
    }
    , userprofile : {
        filename: {type: String, default: null},
        mimetype: {type: String, default: 'image/jpeg'}
    }
});

mongoose.model('entity', entitySchema, 'entity');
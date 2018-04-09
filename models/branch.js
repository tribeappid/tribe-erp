/*
 * AST Enterprise Model
 *
 * Copyright 2017 Tribe App Indonesia
 *
 * Version 1.0.0
 * Author: Hendra
 * 
 * Change Log
 * ----------
 *
 */

var Schema = mongoose.Schema;

branchSchema = new Schema({
    _id : { type : String }
    , name : { type : String, default : null }
    , description : {type: String, default : null}
    , address : {type: String, default : null}
    , phone : {type: String, default : null}
    , create_date : {type: Date, default : null}
    , last_update : {type: Date, default : null}
    , enterprise : { type: String, ref: 'enterprise'}
    , entities : [{
        type: String
        , ref : 'entity'
    }]
    , medias : [{
        type: Schema.Types.ObjectId
        , ref : 'media'
    }]    
});

mongoose.model('branch', branchSchema, 'branch');

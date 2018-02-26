/*
 * Media Model
 *
 * Copyright 2017 Tribe App Indonesia
 *
 * Version 1.0.0
 *
 * Change Log
 * ----------
 * 
 *
 */

var Schema = mongoose.Schema;

mediaSchema = new Schema({
    title : {type: String, default: null}
    , type : {type: String, default: null}
    , file_name : {type: String, default: null}
    , media_url : {type: String, default: null}
    , status : {type: String, default: null}
    , description : {type: String, default: null}
    , file_type : {type: String, default: null}
    , file_size : {type: Number, default: null}
    , file_size_unit : {type: String, default: null}
    , img_url : {type: String, default: null}
    , img_url2 : {type: String, default: null}
    , img_url3 : {type: String, default: null}
    , img_url4 : {type: String, default: null}
    , create_date : {type: Date, default: null}
    , last_update : {type: Date, default: null}
    , entity : {type: String, ref: 'entity'}
    , enterprise : {type: String, ref: 'enterprise'}
    , event : {type: Schema.Types.ObjectId, ref: 'event'}
    , product : {type: String, ref: 'product'}
});

mongoose.model('media', mediaSchema, 'media');

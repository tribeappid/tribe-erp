/*
 * Informative Data Model
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

lookupValueSchema = new Schema({
    name : {type: String, default: null}
    , date_value : {type: Date, default: null}
    , date_value2 : {type:  Date, default: null}
    , date_value3 : {type:  Date, default: null}
    , date_value4 : {type:  Date, default: null}
    , date_range_start : {type:  Date, default: null}
    , date_range_start2 : {type:  Date, default: null}
    , date_range_end : {type:  Date, default: null}
    , date_range_end2 : {type:  Date, default: null}
    , value : {type: String, default: null}
    , value2 : {type: String, default: null}
    , value3 : {type: String, default: null}
    , value4 : {type: String, default: null}
    , int_value : {type: Number, default: null}
    , int_value2 : {type: Number, default: null}
    , int_value3 : {type: Number, default: null}
    , int_value4 : {type: Number, default: null}
    , int_range_start : {type: Number, default: null}
    , int_range_start2 : {type: Number, default: null}
    , int_range_start4 : {type: Number, default: null}
    , int_range_start3 : {type: Number, default: null}
    , int_range_end : {type: Number, default: null}
    , int_range_end2 : {type: Number, default: null}
    , int_range_end3 : {type: Number, default: null}
    , int_range_end4 : {type: Number, default: null}
    , arr_value : [{type: String, default: null}]
    , arr_value2 : [{type: String, default: null}]
    , arr_int_value : [{type: Number, default: null}]
    , arr_int_value2 : [{type: Number, default: null}]
    , bool_value : {type : Boolean, default : null}
    , bool_value2 : {type : Boolean, default : null}
    , bool_value3 : {type : Boolean, default : null}
    , bool_value4 : {type : Boolean, default : null}
    , type : {type: String, default: null}
    , type2 : {type: String, default: null}
    , description : {type: String, default: null}
    , create_date : {type: Date, default: null}
    , feature : {type: Schema.Types.ObjectId, ref: 'lookup_value'}
    , enterprise : {type: String , ref : 'enterprise'}
    , rule : {type: String , ref : 'rule'}
    , medias : [{ type: Schema.Types.ObjectId , ref : 'media' }]
    , products : [{ type: Schema.Types.ObjectId , ref : 'product' }]
});

mongoose.model('lookup_value', lookupValueSchema, 'lookup_value');
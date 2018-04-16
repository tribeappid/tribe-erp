/*
 * Product Model
 *
 * Copyright 2017 Tribe App Indonesia
 *
 * Version 1.0.0
 * Author: Hendra
 *
 * Change Log
 * ----------
 * Added supplier code support
 * Added more types, 2, 3, 4
 * Changed default ID
 *
 */

var Schema = mongoose.Schema;
productSchema = new Schema({
    _id: { type: String }
    , name : { type: String, default : null }
    , description : { type : String, default : null }
    , length : { type : Number, default : null }
    , height : { type : Number, default : null }
    , width : { type : Number, default : null }
    , weight : { type : Number, default : null }
    , status : { type : String, default : null }
    , type : { type : String, default : null }
    , type2 : { type : String, default : null }
    , type3 : { type : String, default : null }
    , type4 : { type : String, default : null }
    , code : { type : String, default : null }
    , code2 : { type : String, default : null }
    , code3 : { type : String, default : null }
    , code4 : { type : String, default : null }
    , code5 : { type : String, default : null }
    , create_date : { type: Date, default : null }
    , last_update : { type: Date, default : null }
    , publish_update : { type: Date, default : null }
    , ecommerce_code : { type : String, default : null }
    , entity : { type: String, ref: 'entity'}
    , category : { type: String , ref : 'category' }
    , enterprise : { type: String , ref : 'enterprise' }
    , branches : [{ type: String , ref : 'branch' }]
    , all_branch: {type: Boolean, default: null}
    , suppliers : [{ type: String , ref : 'enterprise' }]
    , manufacturer : { type: String , ref : 'enterprise' }
    , price : { type: Number, default: null }
    , prices: [{ type: Schema.Types.ObjectId , ref : 'product_value' }]
    , medias : [{ type: Schema.Types.ObjectId , ref : 'media' }]
});

mongoose.model('product', productSchema, 'product');
/*
 * Event Model
 *
 * Copyright 2017 Tribe App Indonesia
 *
 * Version 1.0.0
 * Author : Hendra
 *
 * Change Log
 * ----------
 *
 */

var Schema = mongoose.Schema;

eventSchema = new Schema({
    event_type_name : {type: String, default: null}
    , event_type_id : {type: String, default: null}
    , event_type_id2 : {type: String, default: null}
    , type : {type: String, default: null}
    , create_date : {type: Date, default: null}
    , ip : {type: String, default: null}
    , access_method : {type: String, default : null}
    , alert_level : {type: Number, default: null}
    , entity : {type: String, ref: 'entity'}
    , medias : [{type: Schema.Types.ObjectId, ref: 'media'}]
});

mongoose.model('event', eventSchema, 'event');
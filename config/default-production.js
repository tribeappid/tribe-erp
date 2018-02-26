module.exports = {
    mongo : {
        db : 'TribeErp'
        , dbUser : 'tribeAdmin'
        , password : 'G8XazTSgZrk82RtC'
        , host : 'localhost'
        , port : 27017
    }
    , authorization : {
        100 : '/'
        , 300 : '/'
        , 400 : '/'
        , 410 : '/'
        , 411 : '/'
        , 420 : '/condominium/'
        , 440 : '/agent/'
        , 450 : '/agent/'
        , 490 : '/organization/manage-agent'
        , 500 : '/organization/manage-agent'
        , enterpriseWhiteList : [
            'T8RHLBF1-EVW8M1CF-HDCFVGOV'
        ]
    }
};

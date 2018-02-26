var defaultProduction = require("./default-production");
//var defaultDevelopment = _require("/config/default-development.js");
//var defaultTest = _require("/config/default-test.js");

//var regionEnvironment = _require("/config/" + appName + '-' + reg + '-' + process.env.NODE_ENV + ".js");
/*
var configuration;

if (process.env.NODE_ENV == 'production') {
    configuration = defaultProduction;
}else if (process.env.NODE_ENV == 'development'){
    configuration = defaultDevelopment;
}else if (process.env.NODE_ENV == 'test'){
    configuration = lodash.merge({}, defaultTest, regionEnvironment);
}
*/

module.exports = defaultProduction;

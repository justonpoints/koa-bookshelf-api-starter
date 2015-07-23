var assert = require("assert");
var request = require("request").defaults({jar: true});

require("./auth/test")(assert,request);
require("./admin/test")(assert,request);
var assert = require("assert");
var request = require("request").defaults({jar: true});

require("./login/login.js")(assert,request);
require("./user/user.js")(assert,request);
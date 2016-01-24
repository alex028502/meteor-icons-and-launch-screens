var fs = require('fs');
var util = require('util');
var paths = require('./paths.js');

module.exports = function (sizeArray, typeName) {
    var output = "";
    output += "//after generating images, stick this in mobile-config.js\n";
    output += util.format("App.%s({\n", typeName);
    for (var idx = 0; idx < Object.keys(sizeArray).length; idx++) {
        key = Object.keys(sizeArray)[idx];
        output += util.format("    '%s': '%s'%s\n", key, paths.imagePath(typeName, sizeArray[key]), (idx + 1 == Object.keys(sizeArray).length)?"":",");
    }
    output += "});";
    return output;
};

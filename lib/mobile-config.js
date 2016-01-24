var fs = require('fs');
var util = require('util');
var paths = require('./paths.js');

module.exports = function (sizeArray, typeName) {
    var output = "";
    output += "//after generating images, stick this in mobile-config.js\n";
    output += util.format("App.%s({\n", typeName);
    for (var key in sizeArray) {
        output += util.format("    '%s': '%s',\n", key, paths.imagePath(typeName, sizeArray[key]));
    }
    for (var x in sizeArray) {
        //only do this if if there is at least one item
        output += "    //actually remove the final comma from the above line - wish this were python\n";
        break;
    }
    output += "});";
    return output;
};

var util = require('util');
var pathJoin = require('./path-join.js');

exports.imagePath = function (type, size) {
    return pathJoin(this.imagesPath(type), util.format("%s.png", size));
};

exports.imagesPath = function (type) {
    return "resources/" + type;
};

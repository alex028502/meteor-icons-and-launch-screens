var execSync = require("exec-sync");
var assert = require('assert');
var util = require('util');
var pathJoin = require('./path-join.js');
var paths = require('./paths.js');

module.exports = {};

//default dependency injection - only need to be changed for tests
module.exports.exe = "convert";
module.exports.execSync = execSync;
module.exports.console = console;

//these have no defaults and need to be injected in tests as well as real life
module.exports.imageSizes = undefined;
module.exports.basePath = undefined;

module.exports.execute = function (type) {
    assert(this.imageSizes, "must inject imageSizes");
    this.basePathCheck();
    assert(type, "must call with type argument");

    var imageSizesForType = module.exports.imageSizes[type];
    assert(imageSizesForType, util.format("could not find images for type %s - options are %s", type, Object.keys(this.imageSizes).join(" ,")));

    for (var key in imageSizesForType) {
        var command = this.command(type, imageSizesForType[key]);
        this.console.log("executing: " + command);
        this.console.log(this.execSync(command));
    }
};

module.exports.command = function(type, dimensions) {
    //thanks http://stackoverflow.com/a/18763097/5203563
    //this should crop the splash pages, but not the icons since they are already square
    return util.format("%s %s -resize %s^ -gravity center -crop %s+0+0 %s", this.exe, this.originalPath(type), dimensions, dimensions, this.resizedPath(type, dimensions));
    //the plain command that will work for icons but not splash screens is:
    //return util.format("%s %s -resize %s %s", this.exe, this.originalPath(type), dimensions, this.resizedPath(type, dimensions));
};

module.exports.originalPath = function (type) {
    this.basePathCheck();
    return pathJoin(this.basePath, this.relativeOriginalPath(type));
};

module.exports.relativeOriginalPath = function (type) {
    return util.format("%s.png", paths.imagesPath(type));
};

module.exports.resizedPath = function (type, size) {
    this.basePathCheck();
    return pathJoin(this.basePath, paths.imagePath(type, size));
};

module.exports.basePathCheck = function () {
    assert(this.basePath, "must inject basePath");
}


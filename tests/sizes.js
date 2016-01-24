//sizes.js is copied from this file:
//https://github.com/meteor/meteor/blob/91d511878b77251dd81e83e7be2261af75d6f15f/tools/cordova/builder.js
//then this test lets us know if we need to update
//this is a little easier than actually reading the file from the meteor folder to get the sizes, and this makes sure
//that the programme we are using is made for the format that is currently in the file.

var fs = require('fs');
var pathJoin = require('../lib/path-join.js')
var path = require('path');

function fileExists(path) {
    if (!fs.existsSync(path)) {
        throw path + " does not exist";
    }
}

var folderContainingDotMeteorFolder = process.argv[2];

if (!folderContainingDotMeteorFolder) {
    throw "you have to pass in the folder to search for meteor libs in, usually ~";
}

var dotMeteorFolder = pathJoin(folderContainingDotMeteorFolder, ".meteor");

fileExists(dotMeteorFolder);

var meteorSymlink = pathJoin(dotMeteorFolder, "meteor");

fileExists(meteorSymlink);

var meteorExe = pathJoin(path.dirname(meteorSymlink), fs.readlinkSync(meteorSymlink));

fileExists(meteorExe);

var platformSpecificFolder = path.dirname(meteorExe);

fileExists(platformSpecificFolder);

var builderJSPath = pathJoin(platformSpecificFolder, "/tools/cordova/builder.js");

var sizesJSPath = pathJoin(__dirname, "..", "lib", "sizes.js");

console.log("comparing " + builderJSPath + " with " + sizesJSPath);

fileExists(builderJSPath);
fileExists(sizesJSPath);

var builderJS = String(fs.readFileSync(builderJSPath));
var sizesJS = String(fs.readFileSync(sizesJSPath));

if (builderJS.indexOf(sizesJS) == -1) {
    console.error("looks like " + sizesJSPath);
    console.error("does not match " + builderJSPath);
    console.error("maybe try this on the command line to figure out what's going on:");
    console.error("diff " + sizesJSPath + " " + builderJSPath);
    console.error("the two files should not be the same, but if you look carefully,");
    console.error("you can see the difference in the relevant sections");
    process.exit(1);
}

console.log("looks good!");


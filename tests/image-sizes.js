var assert = require('assert');
var util = require('util');
var fs = require('fs');

var sut = require('../lib/image-sizes.js');

function imageSizeCheck(imageSize) {
    var components = imageSize.split("x");
    assert.equal(components.length, 2, util.format("got %s components instead of 2 in %s", components.length, imageSize));
    for (var componentIdx in components) {
        var component = components[componentIdx];
        assert.equal(Number(component), component, util.format("%s in %s doesn't look like a number", component, imageSize));
    }
}

function checkImageSizeArray(imageSizeArray) {
    for (var sizeKey in imageSizeArray) {
        var size = imageSizeArray[sizeKey];
        imageSizeCheck(size);
    }
}

try {
    //let's just make sure this checker works
    imageSizeCheck("24x25z");
    throw "no exception thrown!";
}
catch (e) {
    assert.equal(String(e), "AssertionError: 25z in 24x25z doesn't look like a number")
}

try {
    //let's just make sure this checker works
    imageSizeCheck("24x25x55");
    throw "no exception thrown!";
}
catch (e) {
    assert.equal(String(e), "AssertionError: got 3 components instead of 2 in 24x25x55");
}

try {
    //make sure we have at least the two expected arrays
    //(and we included the other file correctly)
    assert(Object.keys(sut.icons).length);
    assert(Object.keys(sut.launchScreens).length);
    checkImageSizeArray(sut.icons);
    checkImageSizeArray(sut.launchScreens);
}
catch (e) {
    console.log(sut);
    throw e;
}


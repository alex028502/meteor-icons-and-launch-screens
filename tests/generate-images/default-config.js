var execSync = require("exec-sync");
var assert = require("assert");

var sut = require('../../lib/generator.js');

assert.equal(sut.execSync, execSync);
assert.equal(sut.exe, "convert");
assert.equal(sut.console, console);

//test some intermediate methods to help me debug:
assert.equal(sut.relativeOriginalPath("storeImages"), "resources/storeImages.png");
assert.equal(typeof sut.relativeOriginalPath("storeImages"), "string");

//test absolute path methods individually to make sure that we get the same result with or without
//a slash at the end of the base path

sut.basePath = "/test/path/with/slash/";
assert.equal(sut.originalPath("storeImages"), "/test/path/with/slash/resources/storeImages.png");
assert.equal(sut.resizedPath("storeImages", "500x500"), "/test/path/with/slash/resources/storeImages/500x500.png");


sut.basePath = "/test/path/without/slash";
assert.equal(sut.originalPath("storeImages"), "/test/path/without/slash/resources/storeImages.png");
assert.equal(sut.resizedPath("storeImages", "500x400"), "/test/path/without/slash/resources/storeImages/500x400.png");

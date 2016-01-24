var assert = require('assert');

var sut = require("exec-sync");

var functionOutput = sut("echo test");

assert.equal(functionOutput, "test");

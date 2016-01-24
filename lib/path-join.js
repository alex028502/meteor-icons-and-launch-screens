var path = require('path');
var assert = require('assert');
var util = require('util');
var translateIdx = require('./translate-idx.js');
//needed better debug information when there is an error from passing in a non string

module.exports = function() {
    for (var idx = 0; idx < arguments.length; idx++) {
        assert.equal(typeof arguments[idx], "string", util.format("%s (%s argument) is a %s instead of a string", String(arguments[idx]), translateIdx(idx, arguments.length), typeof arguments[idx]));
    }
    return path.join.apply(path.join, arguments);
};


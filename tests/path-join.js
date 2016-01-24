var assert = require('assert');
var sut = require('../lib/path-join.js');

assert.equal(sut("/item1/", "/item2"), "/item1/item2");
assert.equal(sut("item1", "item2", "item3"), "item1/item2/item3");

try {
    var result = sut(["not a string"], "string");
    throw "returned the following instead of throwing and error: " + result;
} catch (e) {
    if (String(e).indexOf("instead of a string") == -1) throw e;
}

try {
    var result = sut("string", "another string", {"not":"a string"}, "string");
    throw "returned the following instead of throwing and error: " + result;
} catch (e) {
    if (String(e).indexOf("instead of a string") == -1) throw e;
}

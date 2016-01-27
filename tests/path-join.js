Tinytest.add("icons and landing screens - pathJoin", function (assert) {
    var sut = IconsAndLaunchScreens.pathJoin;

    assert.equal(sut("/item1/", "/item2"), "/item1/item2");
    assert.equal(sut("item1", "item2", "item3"), "item1/item2/item3");

    try {
        var result = sut(["not a string"], "string");
        assert.fail("returned the following instead of throwing and error: " + result)
    } catch (e) {
        assert.matches(String(e), /instead of a string/);
    }

    try {
        var result = sut("string", "another string", {"not":"a string"}, "string");
        assert.fail("returned the following instead of throwing and error: " + result);
    } catch (e) {
        assert.matches(String(e), /instead of a string/);
    }
});

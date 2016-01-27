Tinytest.add("icons and landing screens - pathJoin", function (test) {
    var sut = IconsAndLaunchScreens.pathJoin;

    test.equal(sut("/item1/", "/item2"), "/item1/item2");
    test.equal(sut("item1", "item2", "item3"), "item1/item2/item3");

    try {
        var result = sut(["not a string"], "string");
        test.fail("returned the following instead of throwing and error: " + result)
    } catch (e) {
        test.matches(String(e), /instead of a string/);
    }

    try {
        var result = sut("string", "another string", {"not":"a string"}, "string");
        test.fail("returned the following instead of throwing and error: " + result);
    } catch (e) {
        test.matches(String(e), /instead of a string/);
    }
});

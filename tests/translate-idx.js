Tinytest.add('icons and landing screens - translateIdx', function (assert) {
    var sut = IconsAndLaunchScreens.translateIdx;

    assert.equal(sut(0,1), "only"); //can't have a first of one
    assert.equal(sut(0, 2), "former"); //can't have a first of two
    assert.equal(sut(0, 3), "1st"); //can have a first of three
    assert.equal(sut(1, 2), "2nd");
    assert.equal(sut(1, 3), "2nd");
    assert.equal(sut(2, 5), "3rd");
    assert.equal(sut(2, 3), "3rd");
    assert.equal(sut(10, 15), "11th");
    assert.equal(sut(15, 10), "#16 of 10?????");
    assert.equal(sut(10, 10), "#11 of 10?????");
});

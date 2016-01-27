Tinytest.add("icons and landing screens - mobileConfig", function (assert) {
    var sampleOuput = IconsAndLaunchScreens.mobileConfig(mockImagesArray, "hypotheticalImageType");
    var expectedOutput = Assets.getText("tests/mobile-config/expected-mobile-config-output.js");

    assert.equal(numberOfNewLinesAtEnd("55\n\n"), 2, "just make sure the test helper works");
    assert.equal(numberOfNewLinesAtEnd("1111"), 0, "just make sure the test helper works");
    assert.equal(numberOfNewLinesAtEnd("number of new lines\nat end\n\n\n\n"), 4, "just make sure the test helper works with multi line");
    assert.equal(numberOfNewLinesAtEnd("1111\n "), 0, "and make sure one more character at the end sets it back to zero");

    assert.equal(typeof sampleOuput, typeof expectedOutput);
    assert.isTrue(expectedOutput, "make sure we are actually not just getting something empty for both");

    assert.equal(sampleOuput, expectedOutput);

    assert.equal(numberOfNewLinesAtEnd(sampleOuput), numberOfNewLinesAtEnd(expectedOutput), "it's hard to see the difference so easier to check the new lines at the end a different way");
});

function numberOfNewLinesAtEnd(str) {
    var count = 0;
    for (var idx = -1; str.slice(idx)[0] == "\n"; idx--) count++;
    return count;
}
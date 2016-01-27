Tinytest.add("icons and landing screens - imageSizes - extract sizes", function (assert) {

    //I know what you're thinking... what's the point in coming up with a complicated formula for generating the four
    //keywords only to have to hard code the list in a unit test anyhow....
    assert.equal(IconsAndLaunchScreens.imageSizes.keywords().sort(), ["iconsIosSizes", "iconsAndroidSizes", "launchIosSizes", "launchAndroidSizes"].sort());

    //any format change in that file could stop this from working
    //however, this test makes sure that it at least works for the current version, and the development
    //version

    var sampleContentFromDevelopmentVersion = Assets.getText("tests/image-sizes/sampleBuilderFile68f27b2.js");
    var sampleContentFromCurrentVersion = Assets.getText("tests/image-sizes/sampleBuilderFile1.2.1.js");

    assert.isNotNull(expectedSizes, "make sure that we included the expectedSizees object");
    assert.isNotNull(expectedSizes.icons, "make sure that we included the expectedSizees object");
    assert.isNotNull(expectedSizes.launchScreens, "make sure that we included the expectedSizees object");
    assert.equal(IconsAndLaunchScreens.imageSizes.getImageSizes(sampleContentFromDevelopmentVersion), expectedSizes);
    assert.equal(IconsAndLaunchScreens.imageSizes.getImageSizes(sampleContentFromCurrentVersion), expectedSizes);

});

Tinytest.add("icons and landing screens - imageSizes - extract sizes", function (test) {

    //I know what you're thinking... what's the point in coming up with a complicated formula for generating the four
    //keywords only to have to hard code the list in a unit test anyhow....
    test.equal(IconsAndLaunchScreens.imageSizes.keywords().sort(), ["iconsIosSizes", "iconsAndroidSizes", "launchIosSizes", "launchAndroidSizes"].sort());

    //any format change in that file could stop this from working
    //however, this test makes sure that it at least works for the current version, and the development
    //version

    var sampleContentFromDevelopmentVersion = Assets.getText("tests/image-sizes/sampleBuilderFile68f27b2.js");
    var sampleContentFromCurrentVersion = Assets.getText("tests/image-sizes/sampleBuilderFile1.2.1.js");

    test.isNotNull(expectedSizes, "make sure that we included the expectedSizees object");
    test.isNotNull(expectedSizes.icons, "make sure that we included the expectedSizees object");
    test.isNotNull(expectedSizes.launchScreens, "make sure that we included the expectedSizees object");
    test.equal(IconsAndLaunchScreens.imageSizes.getImageSizes(sampleContentFromDevelopmentVersion), expectedSizes);
    test.equal(IconsAndLaunchScreens.imageSizes.getImageSizes(sampleContentFromCurrentVersion), expectedSizes);

});

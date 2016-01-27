fs = require('fs');

function checkIfFileExists(assert, path) {
    if (!fs.existsSync(path)) {
        assert.fail(path + " does not exist");
    }
}

Tinytest.add("icons and landing screens - imageSizes - find files", function (assert) {
    checkIfFileExists(assert, IconsAndLaunchScreens.imageSizes.getHomePath());
    checkIfFileExists(assert, IconsAndLaunchScreens.imageSizes.getPlatformFolderPath());
    checkIfFileExists(assert, IconsAndLaunchScreens.imageSizes.getBuilderJSPath());
    assert.equal(typeof IconsAndLaunchScreens.imageSizes.getBuilderJSContent(), "string");
    assert.matches(IconsAndLaunchScreens.imageSizes.getBuilderJSContent(), /iconsIosSizes/);
    assert.matches(IconsAndLaunchScreens.imageSizes.getBuilderJSContent(), /iconsAndroidSizes/);
    assert.matches(IconsAndLaunchScreens.imageSizes.getBuilderJSContent(), /launchIosSizes/);
    assert.matches(IconsAndLaunchScreens.imageSizes.getBuilderJSContent(), /launchAndroidSizes/);

});

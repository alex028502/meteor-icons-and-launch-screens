fs = require('fs');

function checkIfFileExists(test, path) {
  if (!fs.existsSync(path)) {
    test.fail(path + " does not exist");
  }
}

Tinytest.add("icons and landing screens - imageSizes - find files", function (test) {
  checkIfFileExists(test, IconsAndLaunchScreens.imageSizes.getHomePath());
  checkIfFileExists(test, IconsAndLaunchScreens.imageSizes.getPlatformFolderPath());
  checkIfFileExists(test, IconsAndLaunchScreens.imageSizes.getBuilderJSPath());
  test.equal(typeof IconsAndLaunchScreens.imageSizes.getBuilderJSContent(), "string");
  test.matches(IconsAndLaunchScreens.imageSizes.getBuilderJSContent(), /iconsIosSizes/);
  test.matches(IconsAndLaunchScreens.imageSizes.getBuilderJSContent(), /iconsAndroidSizes/);
  test.matches(IconsAndLaunchScreens.imageSizes.getBuilderJSContent(), /launchIosSizes/);
  test.matches(IconsAndLaunchScreens.imageSizes.getBuilderJSContent(), /launchAndroidSizes/);

});

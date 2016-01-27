var execSync = require("exec-sync");
Tinytest.add('icons and landing screens - Generator - defaults', function (test) {
  var sut = new IconsAndLaunchScreens.Generator();

  test.equal(sut.execSync, execSync);
  test.equal(sut.exe, "convert");
  test.equal(sut.console, console);
});

Tinytest.add('icons and landing screens - Generator - intermediate methods', function (test) {
  var sut = new IconsAndLaunchScreens.Generator();

  //test some intermediate methods to help me debug:
  test.equal(sut.relativeOriginalPath("storeImages"), "resources/storeImages.png");
  test.equal(typeof sut.relativeOriginalPath("storeImages"), "string");
});


Tinytest.add('icons and landing screens - Generator - paths - with slash', function (test) {
  var sut = new IconsAndLaunchScreens.Generator();

  //test absolute path methods individually to make sure that we get the same result with or without
  //a slash at the end of the base path

  sut.basePath = "/test/path/with/slash/";
  test.equal(sut.originalPath("storeImages"), "/test/path/with/slash/resources/storeImages.png");
  test.equal(sut.resizedPath("storeImages", "500x500"), "/test/path/with/slash/resources/storeImages/500x500.png");
});

Tinytest.add('icons and landing screens - Generator - paths - without slash', function (test) {
  var sut = new IconsAndLaunchScreens.Generator();

  //test absolute path methods individually to make sure that we get the same result with or without
  //a slash at the end of the base path

  sut.basePath = "/test/path/without/slash";
  test.equal(sut.originalPath("storeImages"), "/test/path/without/slash/resources/storeImages.png");
  test.equal(sut.resizedPath("storeImages", "500x400"), "/test/path/without/slash/resources/storeImages/500x400.png");
});







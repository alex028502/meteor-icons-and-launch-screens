var execSync = require("exec-sync");
Tinytest.add('icons and landing screens - Generator - defaults', function (assert) { //TODO: rename test arg 'test' - called assert to make changes clearer in git for this step
    var sut = new IconsAndLaunchScreens.Generator();

    assert.equal(sut.execSync, execSync);
    assert.equal(sut.exe, "convert");
    assert.equal(sut.console, console);
});

Tinytest.add('icons and landing screens - Generator - intermediate methods', function (assert) {
    var sut = new IconsAndLaunchScreens.Generator();

    //test some intermediate methods to help me debug:
    assert.equal(sut.relativeOriginalPath("storeImages"), "resources/storeImages.png");
    assert.equal(typeof sut.relativeOriginalPath("storeImages"), "string");
});


Tinytest.add('icons and landing screens - Generator - paths - with slash', function (assert) {
    var sut = new IconsAndLaunchScreens.Generator();

    //test absolute path methods individually to make sure that we get the same result with or without
    //a slash at the end of the base path

    sut.basePath = "/test/path/with/slash/";
    assert.equal(sut.originalPath("storeImages"), "/test/path/with/slash/resources/storeImages.png");
    assert.equal(sut.resizedPath("storeImages", "500x500"), "/test/path/with/slash/resources/storeImages/500x500.png");
});

Tinytest.add('icons and landing screens - Generator - paths - without slash', function (assert) {
    var sut = new IconsAndLaunchScreens.Generator();

    //test absolute path methods individually to make sure that we get the same result with or without
    //a slash at the end of the base path

    sut.basePath = "/test/path/without/slash";
    assert.equal(sut.originalPath("storeImages"), "/test/path/without/slash/resources/storeImages.png");
    assert.equal(sut.resizedPath("storeImages", "500x400"), "/test/path/without/slash/resources/storeImages/500x400.png");
});







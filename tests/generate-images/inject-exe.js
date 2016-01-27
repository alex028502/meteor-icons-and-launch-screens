Tinytest.add('icons and landing screens - Generator - inject echo but actually execute', function (assert) {
    var sut = new IconsAndLaunchScreens.Generator();

    sut.imageSizes = {"hypotheticalType":mockImagesArray};
    sut.basePath = "/home/kevin/projects/todo-list/"
    sut.exe = "echo";
    sut.console = {
        output: "",
        log: function (message) {
            this.output += message + "\n";
        }
    };

    sut.execute("hypotheticalType");
    var expectedResult = Assets.getText("tests/generate-images/expected-result-with-echo.txt");
    assert.equal(sut.console.output, expectedResult);

});




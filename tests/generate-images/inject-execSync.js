Tinytest.add('icons and landing screens - Generator - inject executor', function (test) {
    var sut = new IconsAndLaunchScreens.Generator();

    var mockConsole = {
        output: [],
        log: function (message) {
            this.output.push(message);
        }
    };

    var mockExecSync = function (command) {
        return command;
    };

    sut.imageSizes = {hypotheticalType: mockImagesArray};
    sut.basePath = "/home/kevin/projects/todo-list/";
    sut.console = mockConsole;
    sut.execSync = mockExecSync;

    sut.execute("hypotheticalType");

    test.equal(mockConsole.output.length, 4);
    var expectedCommand01 = "convert /home/kevin/projects/todo-list/resources/hypotheticalType.png -resize 320x480^ -gravity center -crop 320x480+0+0 /home/kevin/projects/todo-list/resources/hypotheticalType/320x480.png";
    var expectedCommand23 = "convert /home/kevin/projects/todo-list/resources/hypotheticalType.png -resize 640x960^ -gravity center -crop 640x960+0+0 /home/kevin/projects/todo-list/resources/hypotheticalType/640x960.png";

    test.equal(mockConsole.output[0].trim(), "executing: " + expectedCommand01);
    test.equal(mockConsole.output[1].trim(), expectedCommand01);
    test.equal(mockConsole.output[2].trim(), "executing: " + expectedCommand23);
    test.equal(mockConsole.output[3].trim(), expectedCommand23);
});

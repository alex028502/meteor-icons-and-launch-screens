var execSync = require('exec-sync');
var path = require('path');
var fs = require('fs');

IconsAndLaunchScreens.imageSizes = {
  getHomePath: function () {
    return execSync("echo $HOME"); //is there a better way to get the home directory?
  },
  getPlatformFolderPath: function () {
    var folderContainingDotMeteorFolder = this.getHomePath();
    var dotMeteorFolder = IconsAndLaunchScreens.pathJoin(folderContainingDotMeteorFolder, ".meteor");
    var meteorSymlink = IconsAndLaunchScreens.pathJoin(dotMeteorFolder, "meteor");
    var meteorExe = IconsAndLaunchScreens.pathJoin(path.dirname(meteorSymlink), fs.readlinkSync(meteorSymlink));
    var platformSpecificFolder = path.dirname(meteorExe);
    return platformSpecificFolder;
  },
  getBuilderJSPath: function () {
    return IconsAndLaunchScreens.pathJoin(this.getPlatformFolderPath(), "/tools/cordova/builder.js");
  },
  getBuilderJSContent: function () {
    return String(fs.readFileSync(this.getBuilderJSPath()));
  },
  getImageSizes: function (builderJSContent) {
    if (builderJSContent == undefined) builderJSContent = this.getBuilderJSContent(); //can inject another file for unit testing
    eval(this.getAbridgedFileContent(builderJSContent));
    var result = {icons: {}, launchScreens: {}};
    for (key in iconsIosSizes) result.icons[key] = iconsIosSizes[key];
    for (key in iconsAndroidSizes) result.icons[key] = iconsAndroidSizes[key];
    for (key in launchIosSizes) result.launchScreens[key] = launchIosSizes[key];
    for (key in launchAndroidSizes) result.launchScreens[key] = launchAndroidSizes[key];
    if (result.launchScreens.ipad_portrait == '768x1004') {
      //code said 1004 but https://gist.github.com/jperl/f8c395b9f0f1056ad890 said 1024
      result.launchScreens.ipad_portrait = '768x1024';
    }
    if (result.launchScreens.ipad_portrait_2x == '1536x2008') {
      //code said 2004 but https://gist.github.com/jperl/f8c395b9f0f1056ad890 said 2048
      result.launchScreens.ipad_portrait_2x = '1536x2048';
    }

    return result;

  },
  getAbridgedFileContent: function (builderJSContent) {
    var builderJSLines = builderJSContent.split("\n");

    var abridgedFile = "";
    var inSection = false;
    var sectionsCompleted = 0;
    for (var line of builderJSLines) {
      if (!inSection && this.lineIsStartOfSection(line)) inSection = true;
      if (inSection) abridgedFile += line + "\n";
      if (inSection && this.lineIsEndOfSection(line)) {
        inSection = false;
        if (++sectionsCompleted == this.keywords().length) break;
      }
    }
    return abridgedFile;
  },
  lineIsStartOfSection: function (line) {
    for (var keyword of this.keywords()) {
      if (includes(line, keyword)) return true;
    }
    return false;
  },
  lineIsEndOfSection: function (line) {
    return includes(line, "};");
  },
  keywords: function (type) {
    if (!type) {
      return this.keywords("launchScreens").concat(this.keywords("icons"));
    }
    var particle = (type == "launchScreens") ? "launch" : type;
    var result = [];
    for (var os of ["Ios", "Android"]) {
      result.push(particle + os + "Sizes");
    }
    return result;
  },

};

function includes(haystack, needle) {
  return haystack.indexOf(needle) >= 0;
}

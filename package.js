Package.describe({
  name: "icons-and-launch-screens",
  version: '0.0.1',
  summary: 'Generate Icons and Landing Screens'
});

var fileArray = [];
fileArray.push('lib/npm.js');
fileArray.push('lib/namespace.js');
fileArray.push('lib/paths.js');
fileArray.push('lib/translate-idx.js');
fileArray.push('lib/path-join.js');
fileArray.push('lib/image-sizes.js');
fileArray.push('lib/generator.js');
fileArray.push('lib/mobile-config.js');

Package.onUse(function (api) {
  api.use('ecmascript');
  api.use('underscore');
  api.add_files(fileArray, "server");
  //this item is only exported for unit testing, which turned out to be quite hard without exporting
  //so if anybody find any of these now public items useful, that's great!
  api.export('IconsAndLaunchScreens');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use(["tinytest", "icons-and-launch-screens"], "server");
  api.add_files("lib/npm.js", "server");
  api.add_files("tests/mock-images-array.js", "server");
  api.add_files("tests/translate-idx.js", "server");
  api.add_files("tests/path-join.js", "server");
  api.add_files("tests/image-sizes/files.js", "server");
  api.add_files(["tests/image-sizes/sampleBuilderFile1.2.1.js", "tests/image-sizes/sampleBuilderFile68f27b2.js"], "server", {isAsset: true});
  api.add_files(["tests/image-sizes/expected-sample-sizes.js", "tests/image-sizes/extract-sizes.js"], "server");
  api.add_files("tests/image-sizes/all-together.js", "server");
  api.add_files("tests/generate-images/default-config.js", "server");
  api.add_files("tests/generate-images/inject-execSync.js", "server");
  api.add_files("tests/mobile-config/expected-mobile-config-output.js", "server", {isAsset: true});
  api.add_files("tests/mobile-config/test.js", "server");
  api.add_files("tests/generate-images/expected-result-with-echo.txt", "server", {isAsset: true});
  api.add_files("tests/generate-images/inject-exe.js", "server");
});

Npm.depends({
  "exec-sync": "0.1.6",
  "util": "0.10.3"
});


Package.registerBuildPlugin({
  name: "icons-and-launch-screens-plugin",
  use: ['ecmascript'],
  sources: fileArray.concat(['plugin.js']),
  npmDependencies: {
    "exec-sync": "0.1.6",
    "util": "0.10.3"
  }
});

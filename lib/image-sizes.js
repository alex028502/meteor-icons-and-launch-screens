var fs = require('fs');

var sizeJS = fs.readFileSync(__dirname + '/sizes.js','utf8');
eval(sizeJS);

module.exports = {icons:{}, launchScreens:{}};
for (key in iconsIosSizes) module.exports.icons[key] = iconsIosSizes[key];
for (key in iconsAndroidSizes) module.exports.icons[key] = iconsAndroidSizes[key];
for (key in launchIosSizes) module.exports.launchScreens[key] = launchIosSizes[key];
for (key in launchAndroidSizes) module.exports.launchScreens[key] = launchAndroidSizes[key];
module.exports.launchScreens.ipad_portrait = '768x1024'; //code said 1004 but https://gist.github.com/jperl/f8c395b9f0f1056ad890 said 1024
module.exports.launchScreens.ipad_portrait_2x = '1536x2048'; //code said 2004 but https://gist.github.com/jperl/f8c395b9f0f1056ad890 said 2048

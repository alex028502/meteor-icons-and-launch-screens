var util = require('util');

IconsAndLaunchScreens.paths = {};

IconsAndLaunchScreens.paths.imagePath = function (type, size) {
  return IconsAndLaunchScreens.pathJoin(this.imagesPath(type), util.format("%s.png", size));
};

IconsAndLaunchScreens.paths.imagesPath = function (type) {
  return "resources/" + type;
};

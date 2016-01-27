var util = require('util');

IconsAndLaunchScreens.paths = {};

IconsAndLaunchScreens.paths.imagePath = function (type, size) {
    var pathJoin = IconsAndLaunchScreens.pathJoin; //TODO: inline this
    return pathJoin(this.imagesPath(type), util.format("%s.png", size));
};

IconsAndLaunchScreens.paths.imagesPath = function (type) {
    return "resources/" + type;
};

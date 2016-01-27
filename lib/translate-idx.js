var util = require('util');

IconsAndLaunchScreens.translateIdx = function (idx, length) {
  if (idx >= length) {
    return util.format("#%s of %s?????", idx + 1, length);
  }

  switch (idx) {
    case 0:
      switch (length) {
        case 1:
          return "only"; //you can't have a first of one!
        case 2:
          return "former"; //you can't have a first of two!
        default:
          return "1st"
      }
    case 1:
      return "2nd";
    case 2:
      return "3rd";
    default:
      return util.format("%sth", idx + 1);
  }
};

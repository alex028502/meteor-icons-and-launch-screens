var util = require('util');

Tinytest.add("icons and landing screens - imageSizes - finished list", function (test) {
  //first let's make sure our test helpers work:
  test.equal(imageSizeCheck("24x25z"), "25z in 24x25z doesn't look like a number");
  test.equal(imageSizeCheck("24x25x55"), "got 3 components instead of 2 in 24x25x55")
  test.isFalse(imageSizeCheck("55x55"));

  var sut = IconsAndLaunchScreens.imageSizes.getImageSizes();

  test.isTrue(Object.keys(sut.icons).length);
  test.isTrue(Object.keys(sut.launchScreens).length);

  test.isFalse(checkImageSizeArray(sut.icons));
  test.isFalse(checkImageSizeArray(sut.launchScreens));
});

function imageSizeCheck(imageSize) {
  var components = imageSize.split("x");
  if (components.length != 2) return util.format("got %s components instead of 2 in %s", components.length, imageSize);
  for (var componentIdx in components) {
    var component = components[componentIdx];
    if (Number(component) != component) return util.format("%s in %s doesn't look like a number", component, imageSize);
  }
  return false;
}

function checkImageSizeArray(test, imageSizeArray) {
  for (var sizeKey in imageSizeArray) {
    var size = imageSizeArray[sizeKey];
    var result = imageSizeCheck(size);
    if (result) return result;
  }
  return false;
}




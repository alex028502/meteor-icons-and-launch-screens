///this output should be compared with sampeCode.js (content, not ouput) using diff
var mockImagesArray = require("../mock-images-array.js");

var sut = require('../../lib/mobile-config.js');

console.log(sut(mockImagesArray, "hypotheticalImageType"));

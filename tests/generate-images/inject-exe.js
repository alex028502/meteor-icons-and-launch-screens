var sut = require('../../lib/generator.js');
var mockImagesArray = require('../mock-images-array.js');

sut.imageSizes = {"hypotheticalType":mockImagesArray};
sut.basePath = "/home/kevin/projects/todo-list/"
sut.exe = "echo";

sut.execute("hypotheticalType", console.log);

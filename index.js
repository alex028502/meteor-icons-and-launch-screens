var util = require('util');
var imageSizes = require('./lib/image-sizes.js');
var mobileConfig = require('./lib/mobile-config.js');
var paths = require('./lib/paths.js');

var generator = require('./lib/generator');

generator.imageSizes = imageSizes;
generator.basePath = process.cwd();

var actions = {
    code: function (type) {console.log(mobileConfig(imageSizes[type], type));},
    images: function (type) {generator.execute(type);}
};

if (process.argv.length != 4 || !actions[process.argv[2]] || !imageSizes[process.argv[3]]) {
    console.log("usage: node images.js ACTION TYPE");
    console.log("ACTION can be " + Object.keys(actions).join(", "));
    console.log("TYPE can be " + Object.keys(imageSizes).join(", "));
    process.exit(1);
}

actions[process.argv[2]](process.argv[3]);

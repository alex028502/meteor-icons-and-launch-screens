/*
I couldn't figure out any other way to add a command line tool.

Environment variable METEOR_IMAGE_ACTION tells this tool to generate images or do something else, and then kill the
startup process.

It would be much better to tell it to generate new images whenever they change instead.

This workaround is a bit slow but will work for now, since I don't change my launch images and icons that often.

thanks for the ideas https://github.com/meteorhacks/npm

to make sure this crazy scheme is working try this:

METEOR_IMAGE_ACTION=HELLO-WORLD meteor

*/

var path = require('path');
var fs = require('fs');

var action = process.env.METEOR_IMAGE_ACTION;
if (action) {
    console.log(); //stops it from writting output overtop of last message from meteor
    console.log();
    console.log("Meteor start-up has been stopped because the environment variable METEOR_IMAGE_ACTION has been set");
    console.log("If this is unintentional...");
    console.log("see if you have set and/or exported it:");
    console.log("echo $METEOR_IMAGE_ACTION");
    console.log("unset it if you have:")
    console.log("unset METEOR_IMAGE_ACTION");
    console.log("It's best to set this variable inline like this, and not export it:");
    console.log("METEOR_IMAGE_ACTION=GENERATE-IMAGES meteor");
    console.log();
    switch (action) {
        case "GENERATE-IMAGES":
            makeSureWeHaveTheFilesAndFoldersWeNeed();
            generator = new IconsAndLaunchScreens.Generator();
            generator.imageSizes = IconsAndLaunchScreens.imageSizes.getImageSizes();
            generator.basePath = process.cwd();
            for (type in IconsAndLaunchScreens.imageSizes.getImageSizes()) {
                generator.execute(type);
            }
            generator.execute("icons");
            generator.execute("launchScreens");
            break;
        case "GENERATE-CODE":
            for (type in IconsAndLaunchScreens.imageSizes.getImageSizes()) {
                console.log(IconsAndLaunchScreens.mobileConfig(IconsAndLaunchScreens.imageSizes.getImageSizes()[type], type));
            }
            break;
        case "HELLO-WORLD":
            console.log("hello, world\n");
            break;
        default:
            console.error("no such action as " + action);
            process.exit(2);
    }
    process.exit(0);
}

function checkForFile(relativePath) {
    var absolutePath = path.resolve(relativePath);
    if (!fs.existsSync(absolutePath)) {
        throw "can't find " + absolutePath;
    }
}

//TODO: replace this with call to unit tested unit for checking for directories
function makeSureWeHaveTheFilesAndFoldersWeNeed() {
    var expectedFiles = ['resources', 'resources/icons', 'resources/icons.png', 'resources/launchScreens', 'resources/launchScreens.png'];
    for (var expectedFile of expectedFiles) {
        try {
            checkForFile(expectedFile);
        }
        catch (e) {
            console.error("issue while generating icons with icons-and-launch-screens");
            console.error("error while looking for resources folder:");
            console.error(e);
            console.error("you must have the following folders in your project root:");
            for (var file of expectedFiles) {
                console.error(file);
            }
            console.error("for best results, icons.png should be at least 192x192,")
            console.error("and launchScreens.png should be 2208x2208 with the picture")
            console.error("in the middle no bigger than 1200x1200");
            process.exit(1);
        }
    }
}






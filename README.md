#meteor icons and splash screens

package to generate icons and launch screen images for the meteor framework using image magic

##basic idea
This tool is a bit of a hack.  It uses the meteor plugin system to run a script on meteor start-up.  Then it uses
environment variables to decide to determine whether to generate images, generate code for mobile-config.js, or let
meteor start.

The two commands are `METEOR_IMAGE_ACTION=GENERATE-IMAGES meteor` and `METEOR_IMAGE_ACTION=GENERATE-CODE meteor`.  Both
commands stop meteor from starting, but use meteor to figure out which image sizes are needed.

It would be great to set up it so that the assets are regenerated every time the two base files are changed, but this is
a start, and will solve my problem for now.

##raw material

This has been tested the same base images as ionic's asset generator: [http://blog.ionic.io/automating-icons-and-splash-screens/]

launchScreens.png should be 2208x2208 with the logo in the middle, no bigger than about 1200 by 1200
icons.png should be 192x192

##installation

This package is not on atomosphere (yet) so make your ci copy it in something like this:

```bash
#thanks http://stackoverflow.com/a/8963061/5203563
rm -rf packages/icons-and-launch-screens
git clone --depth 1 --branch master <this repository> packages/icons-and-launch-screens
rm -rf packages/icons-and-launch-screens/.git
echo "" >> packages/icons-and-launch-screens/.gitignore
echo "#the following * was added so that this doesn't get committed to the local repo" >> packages/icons-and-launch-screens/.gitignore
echo "*" >> packages/icons-and-launch-screens/.gitignore
```

You must have image imagemagick installed for this to work.  Try `which convert` or `convert --version`
I'm using this one:
```
Version: ImageMagick 6.8.9-9 Q16 x86_64 2015-08-06 http://www.imagemagick.org
Copyright: Copyright (C) 1999-2014 ImageMagick Studio LLC
Features: DPC Modules OpenMP
Delegates: bzlib djvu fftw fontconfig freetype jbig jng jpeg lcms lqr ltdl lzma openexr pangocairo png tiff wmf x xml zlib
```

Your project should have the following folder structure:

```bash
mkdir resources
echo "landingScreens.png" >> resources/.gitignore
echo "icons.png" >> resources/.gitignore
mkdir resources/landingScreens
mkdir resources/icons
#You may want to commit the images instead of gitignoring them so they don't have to be renerated until there is a
#change - up to you
echo "*" >> resources/landingScreens/.gitignore
echo "!.gitignore" >> resources/landingScreens/.gitignore
echo "*" >> resources/icons/.gitignore
echo "!.gitignore" >> resources/icons/.gitignore
echo "replace this file with 2208x2208 image with a 1200x1200 logo in the middle" > resources/landingScreens.png
echo "replace this file with 192x192 icon" > resources/icons.png
```

##generate your code

```bash
METEOR_IMAGE_ACTION=GENERATE-CODE meteor
```

This takes a little while since meteor has to start.  However, you should only have to do it once.  This should output
some code to put into mobile-config.js

##generate your images

```bash
METEOR_IMAGE_ACTION=GENERATE-IMAGES meteor
```

You may or may not want to commit the images.  I am doing this as a part of ci, but it is quite slow.


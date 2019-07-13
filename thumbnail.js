require('shelljs/global');
var fs = require('fs');
var path = require('path');
var readlineSync = require('readline-sync');
var Jimp = require('jimp');
var options = require('./thumbnailOptions.js');

var size = options.size;
var imagesDir = options.imagesDirectory;
// var images = ls(`${imagesDir}/*.jpg`); // fs.readdirSync
var images = find(imagesDir).filter(i => i.match(/\.(png|jpg)$/i));     // recursively scans thumbs dir too
                                                                        // so that might need to be fixed
var thumbsDirectory = `${imagesDir}/thumbs`;

// if (test("-d", thumbsDirectory))
if (fs.existsSync(thumbsDirectory)) {
    var res = readlineSync.keyInYN(`${thumbsDirectory} exists. Would you like to delete it and continue?`)
    if (!res) {echo('thumbnails have not been deleted'); exit();};
    rm('-rf', thumbsDirectory); // fs.rmdirSync
}
mkdir(thumbsDirectory); // fs.mkdirSync

images.forEach( imagePath => {
    Jimp
        .read(imagePath)
        .then(
            image => {
                // var filename = path.basename(imagePath, '.jpg'); // get filename minus .jpg
                var filename = path.basename(imagePath);
                const rootname = filename.slice(0, filename.length - 4);
                const ext = filename.substr((filename.lastIndexOf('.') + 1));
                var thumbFile = path.join(thumbsDirectory, `${rootname}_thumb.${ext}`);
                // echo(`width: ${i.bitmap.width}  height: ${i.bitmap.height}`);
                // echo('thumb', thumbFile);
                // exit();
                image
                    .background(0xFFAAAAAA)
                    .contain(size, size)  // default black background
                    // .cover(200, 200)  // clips parts of image out of bounds
                    // .crop(0,0,512,512)  // x, y, width, height
                    // .posterize(20)
                    // .quality(80)
                    // .resize(250, 250); // or Jimp.AUTO, 250
                    // .scale(0.5)
                    // .sepia()
                    .write(thumbFile);
                return thumbFile
            }

        )
        .then(thumb => {
            exec(`open "${thumb}"`)
        })
        .catch(e => console.log('error', e));

})
var program = require('commander');

program
    .version('1.0')
    // .option('-s --size [<integer>]', 'The desired image size (height and width)')
    .option('-s --size <integer>', 'The desired image size (height and width)', 200)
    .option('-d --directory <path>', 'The directory of images to be converted')
    .parse(process.argv);

// var imagesDir = process.argv[2] || 'imgs';
var imagesDir = program.directory;
// var size = +process.argv[3] || +200;
var size = +program.size;

if (!imagesDir) {
    echo('images directory required');
    program.help();
}

module.exports.imagesDirectory = program.directory;
module.exports.size = +program.size;
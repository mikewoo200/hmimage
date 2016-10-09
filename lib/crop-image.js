'use strict';

/**
 * Crop 3-picture collage into a square-like primary image
 */

var gm = require('gm').subClass({
    imageMagick: true
});

var getCroppedImageName = (imgFilename) => {
    return imgFilename.toLowerCase().replace('.jpg', '-crp.jpg');
};

var cropImage = (imgFilename) => {
    var croppedImageName = getCroppedImageName(imgFilename);
    var image = gm(imgFilename);
    image
        .crop(480, 500, 40, 125)
        .quality(100)
        .write(croppedImageName, function (err) {
            if (!err) {
                console.log(imgFilename, '===> done');
            }
        });
};

module.exports = cropImage;

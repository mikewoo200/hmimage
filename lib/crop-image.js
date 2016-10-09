'use strict';

/**
 * Crop 3-picture collage into a square-like primary image
 */

var gm = require('gm').subClass({
    imageMagick: true
});

var getCroppedImageName = (img) => {
    return img.toLowerCase().replace('.jpg', '-crp.jpg');
};

var cropImage = (img) => {
    var croppedImageName = getCroppedImageName(img);
    var image = gm(img);
    image
        .crop(480, 500, 40, 125)
        .quality(100)
        .write(croppedImageName, function (err) {
            if (!err) {
                console.log(img, '===> done');
            }
        });
};

module.exports = cropImage;

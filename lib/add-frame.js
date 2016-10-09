'use strict';

/**
 * Add frame to a picture
 */

const frameWidth = 30;

const sunflower = '#FCD31D';
const darkSunflower = '#D89C07';

const pink ='#FFA3B5';
const darkPink = '#B6707E';

const ocean = '#1DE4FC';
const darkOcean = '#079DAF';

const purple = '#CDB4F8';
const darkPurple = '#9E47F1';

const gm = require('gm').subClass({
    imageMagick: true
});

const getFramedImageName = (img) => {
    return img.toLowerCase().replace('.jpg', '-frame.jpg');
};

const cropImage = (img) => {
    const framedImageName = getFramedImageName(img);
    const image = gm(img);
    image.size(function (err, value) {
        // TODO: handle err
        const width = value.width;
        const height = value.height;
        image
            .gravity('Center')
            .background(purple)
            .extent(width + frameWidth, height + frameWidth)
            .quality(100)
            .write(framedImageName, function (err) {
                if (!err) {
                    console.log(img, '===> done');
                }
            });
    });
};

module.exports = cropImage;

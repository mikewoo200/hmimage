'use strict';

/**
 * Add color frames to an image
 */

const gm = require('gm').subClass({
    imageMagick: true
});

const colorArr = [
    // yellow
    ['#D89C07','#FCD31D'],
    // red
    ['#B6707E', '#FFA3B5'],
    // blue
    ['#079DAF', '#1DE4FC'],
    // purple
    ['#9E47F1', '#CDB4F8']
];

const frameWidthArr = [10, 30];
const gravityValue = 'Center';

const getColor = () => {
    return colorArr[Math.floor(Math.random() * 4)];
};

const addOneFrame = (imageFilename, image, colorObj, round, cb) => {
    const color = colorObj[round];
    const borderWidth = frameWidthArr[round];
    image.size(function (err, value) {
        // TODO: handle err
        const width = value.width;
        const height = value.height;
        image
            .gravity(gravityValue)
            .background(color)
            .extent(width + borderWidth, height + borderWidth)
            .quality(100)
            .write(imageFilename, function (err) {
                if (!err) {
                    console.log(imageFilename, '===> done with round ' + round);
                }
                if (cb) {
                    cb();
                }
            });
    });
};

const addFrame = (img) => {
    const image = gm(img);
    // We want to use the same color theme for each image
    const color = getColor();
    addOneFrame(img, image, color, 0, function() {
        addOneFrame(img, image, color, 1);
    });
};

module.exports = addFrame;

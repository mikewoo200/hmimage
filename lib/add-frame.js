'use strict';

/**
 * Add frame to a picture
 */

const gravityValue = 'Center';
const frameWidthArr = [10, 30];
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

const gm = require('gm').subClass({
    imageMagick: true
});

const getColor = () => {
    return colorArr[Math.floor(Math.random() * 4)];
};

const addOneFrame = (imageFilename, image, width, height, colorObj, round, cb) => {
    const color = colorObj[round];
    let borderWidth = (round === 0) ? frameWidthArr[0] : frameWidthArr[0] + frameWidthArr[1];
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
};

const addFrame = (img) => {
    const image = gm(img);
    const color = getColor();
    image.size(function (err, value) {
        // TODO: handle err
        const width = value.width;
        const height = value.height;
        image
            addOneFrame(img, image, width, height, color, 0, function() {
                addOneFrame(img, image, width, height, color, 1);
            });
    });
};

module.exports = addFrame;

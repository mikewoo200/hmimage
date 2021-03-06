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

// Use with 800 x 600 pics
// const frameWidthArr = [10, 30];

// Use with 2048 x 1536 pics 
const frameWidthArr = [26, 77];

const gravityValue = 'Center';

const getColor = (index) => {
    return colorArr[index % 4];
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
            .quality(90)
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

const addFrame = (imgFilename, index) => {
    const image = gm(imgFilename);
    // We want to use the same color theme for each image
    const color = getColor(index);

    // Add frame to copyrighted image only
    if (imgFilename.indexOf('-cr.jpg') > -1) {
        addOneFrame(imgFilename, image, color, 0, function() {
            addOneFrame(imgFilename, image, color, 1);
        });
    }
};

module.exports = addFrame;

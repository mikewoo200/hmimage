'use strict';

/**
 * Add frame to a picture
 */

const gravityValue = 'Center';
const frameWidthArr = [10, 30];
const colorArr = [{
    // yellow
    dark: '#D89C07',
    light: '#FCD31D'
}, {
    // red
    dark: '#B6707E',
    light: '#FFA3B5'
},{
    // blue
    dark: '#079DAF',
    light: '#1DE4FC'
}, {
    // purple
    dark: '#9E47F1',
    light: '#CDB4F8'
}];

const gm = require('gm').subClass({
    imageMagick: true
});

const getColor = () => {
    return colorArr[Math.floor(Math.random() * 4)];
};

// const getFramedImageName = (img) => {
//     return img.toLowerCase().replace('.jpg', '-frame.jpg');
// };

const addFrame = (img) => {
    // const framedImageName = getFramedImageName(img);
    const image = gm(img);
    const color = getColor();
    image.size(function (err, value) {
        // TODO: handle err
        const width = value.width;
        const height = value.height;
        image
            .gravity(gravityValue)
            .background(color.dark)
            .extent(width + frameWidthArr[0], height + frameWidthArr[0])
            .quality(100)
            .write(img, function (err) {
                if (!err) {
                    console.log(img, '===> done with inner border');
                }
                image
                    .gravity(gravityValue)
                    .background(color.light)
                    .extent(width + frameWidthArr[0] + frameWidthArr[1], height + frameWidthArr[0] + frameWidthArr[1])
                    .quality(100)
                    .write(img, function (err) {
                        if (!err) {
                            console.log(img, '===> done with outer border');
                        }
                    });
            });
    });
};

module.exports = addFrame;

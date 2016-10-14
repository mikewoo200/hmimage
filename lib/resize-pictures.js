'use strict';

var gm = require('gm').subClass({
    imageMagick: true
});

var majorLength = 800;
var minorLength = 600;

var resizePicture = (imgFilename) => {
    var image = gm(imgFilename);
    image.size((err, value) => {
        // TODO: handle err
        var isPortrait = (value === 'RightTop');
        var w = majorLength;    // default value
        var h = minorLength;    // default value
        if (isPortrait) {
            w = minorLength;
            h = majorLength;
        }
        image
            .resize(w, h)
            .quality(90)
            .write(imgFilename, function (err) {
                if (!err) {
                    console.log(imgFilename, '===> done');
                }
            });            
    });
};

module.exports = resizePicture;

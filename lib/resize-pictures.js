'use strict';

var gm = require('gm').subClass({
    imageMagick: true
});

var resizePicture = (img) => {
    var image = gm(img);
    image.orientation((err, value) => {
        // TODO: handle err
        var isPortrait = (value === 'RightTop');
        var w = 640;    // default value
        var h = 480;    // default value
        if (isPortrait) {
            w = 480;
            h = 640;
        }
        image
            .resize(w, h)
            .quality(90)
            .write(img, function (err) {
                if (!err) {
                    console.log(img, '===> done');
                }
            });            
    });
};

module.exports = resizePicture;
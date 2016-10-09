'use strict';

var gm = require('gm').subClass({
    imageMagick: true
});

var getCrName = (img) => {
    return img.toLowerCase().replace('.jpg', '-cr.jpg');
};

var overlayCopyrights = (imgFilename, image, isPortrait) => {
    var imageCrName = getCrName(imgFilename);
    var imageCr;
    // var watermarkFile = 'img/Copyright640640-7percent.png';
    var sewnInUsa = 'img/sewnInUsa40-transparent.png';
    var hingmadeEtsyCom = 'img/hingmade-etsy-com.png';
    var hingmadeEtsyComGeo = isPortrait ? '-90+30' : '-90+10';
    image
        // .composite('img/Copyright.gif')
        .composite(sewnInUsa)
        .geometry('+10+10')
        .gravity('SouthEast')
        .write(imageCrName, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log(imgFilename, '===> done adding copyright text');
                imageCr = gm(imageCrName);
                imageCr
                    // .composite(watermarkFile)
                    .composite(hingmadeEtsyCom)
                    .geometry(hingmadeEtsyComGeo)
                    .gravity('North')
                    .write(imageCrName, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(imgFilename, '===> done adding copyright watermark');
                        }
                    }); 
            }
        });
}

var addCopyright = (imgFilename) => {
    let image = gm(imgFilename);
    // image.orientation((err, value) => {
        // TODO: handle err
        // let isPortrait = (value === 'RightTop');
    image.size((err, value) => {
        // TODO: handle err
        let isPortrait = (value.height > value.width);
        overlayCopyrights(imgFilename, image, isPortrait);
    });
};

module.exports = addCopyright;
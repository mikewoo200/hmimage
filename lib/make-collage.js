'use strict';

var exec = require('child_process').exec;
var fs = require('fs');
var gm = require('gm').subClass({
    imageMagick: true
});

var collageFolder = 'collage';
var collageOutputFolder = 'collage-output';
var smallTextColor = 'rgba(255,255,255,0.2)';
var fontOriginal = 'img/comic.ttf';
var fontCopy = collageFolder + '/comic.ttf';

var moveFont = () => {
    fs.createReadStream(fontOriginal).pipe(fs.createWriteStream(fontCopy));
};

var generateHingmade = () => {
    console.log('generating Hingmade... \n');
    var cmd = 'convert -size 300x63 xc:transparent -font ' + fontCopy + ' -pointsize 30 -gravity West -fill "' + smallTextColor + '" -annotate +0+0 hingmade.etsy.com -fill "' + smallTextColor + '" -annotate +0.3+0.3 hingmade.etsy.com ' + collageFolder + '/hingmade.png';
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log('generateHingmade error', error);
        }
        console.log('generateHingmade stdout', stdout);
    });
};

var generateCopyright = () => {
    console.log("generating Copyright... \n");
    var cmd = 'convert -size 120x50 xc:transparent -font ' + fontCopy + ' -pointsize 22 -gravity center -fill "' + smallTextColor + '" -annotate +0+0 ©hingmade -fill "' + smallTextColor + '" -annotate +1+1 ©hingmade ' + collageFolder + '/copyright.png';
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log('generateCopyright error', error);
        }
        console.log('generateCopyright stdout', stdout);
    });
};

var createCollage = () => {

    fs.readdir(collageFolder, (err, data) => {
        if (err) {
            console.log('err', err);
            console.log('data', data);
            return;
        }
        data.forEach((i) => {
            if (i !== collageOutputFolder) {
                // console.log(i);
                let iFullPath = collageFolder + '/' + i;
                fs.readdir(iFullPath, (err, data) => {
                    if (err) {
                        console.log('err', err);
                        console.log('data', data);
                        return;
                    }
                    console.log(data);
                    for (let k = 0; k < data.length; k++) {
                        let j = data[k];
                        if (j === '.DS_Store') {
                            fs.unlink(iFullPath + '/.DS_Store', (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            let jFullPath = iFullPath + '/' + j;
                            let image = gm(jFullPath);
                            image.orientation((err, value) => {
                                // TODO: handle err
                                let isPortrait = (value === 'RightTop');
                                if (isPortrait) {
                                    fs.rename(jFullPath, iFullPath + '/v.jpg', function (err, data) {
                                        console.log('imgH > imgW');
                                        return;            
                                    });
                                } else if (j !== 'v.jpg' && j.toLowerCase() !== 'h.jpg' && j !== '2.jpg' && j !== '3.jpg') {
                                    fs.stat(iFullPath + '/2.jpg', function (err, stats) {
                                        if (!err) {
                                            fs.rename(jFullPath, iFullPath + '/3.jpg', function (err, data) {
                                                console.log('renamed if');
                                                return;
                                            });
                                        } else {
                                            fs.rename(jFullPath, iFullPath + '/2.jpg', function (err, data) {
                                                console.log('renamed else');
                                                return;
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
    });



//    my %tempDirList = $File::Find::name;
//    foreach $tempDir (sort keys %tempDirList) {
//       opendir(DIR, $tempDir) or die $!;      
//       while ($tempFile = readdir(DIR)) {
//         # We only want files
//         next unless (-f "$tempDir/$tempFile");

//         # Use a regular expression to find files ending in .txt
//         next unless ($tempFile =~ m/\.jpg$/i);

//         next if ($tempDir =~ /collage/);  # skip folder with name of collage
//         $shortFolder = $_;
//         $width = `identify\ -format\ \"%w\"\ $tempDir\\$tempFile`; 
//         $height = `identify\ -format\ \"%h\"\ $tempDir\\$tempFile`;

//         if ($height > $width) {
//             system("move\ $tempDir\\$tempFile\ $tempDir\\v.jpg");
//         } elsif ($tempFile ne "v.jpg" and $tempFile ne "h.JPG" and $tempFile ne "h.jpg" and $tempFile ne "2.jpg" and $tempFile ne "3.jpg") {
//             if (-e "$tempDir\\2.jpg") {
//                system("move\ $tempDir\\$tempFile\ $tempDir\\3.jpg");
//             } else {
//                system("move\ $tempDir\\$tempFile\ $tempDir\\2.jpg");
//             }
//         }
//       }
//       closedir(DIR);
//    }

//    if (-e "$_1\\v.jpg") {
//       if ($vhhOption eq "a") {
//          &makeLVHH;
//       } else {
//          &makePVHH;
//       }
//    } elsif (-e "$_1\\h.jpg") {
//       &makePHHH;
//    }
//    &moveCollage;
};


var makeCollage = (imgFilename) => {
    moveFont();
    generateHingmade();
    generateCopyright();
    createCollage();
};

module.exports = makeCollage;

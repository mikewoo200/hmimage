'use strict';

var fs = require('fs');
var promptLib = require('prompt');
var utils = require('./lib/utils');

var taskArr = [
    // require('./lib/resize-pictures'),
    require('./lib/add-copyright'),
    require('./lib/crop-image'),
    require('./lib/add-frame')
];

var performTaskOnFiles = (task) => {
    promptLib.get('path', (err, result) => {
        var imgPath;
        if (err) {
            utils.handlePromptError();
        } else {
            imgPath = result.path || 'input';
            fs.readdir(imgPath, (err, data) => {
                if (err) {
                    console.log('err', err);
                    console.log('data', data);
                    return;
                }
                data.forEach((filename, index) => {
                    var fullPath = imgPath + '/' + filename;
                    if (utils.getExtension(filename).toLowerCase() === 'jpg') {
                        task(fullPath, index);
                    }
                });
            });
        }
    });
};

var getTask = () => {
    promptLib.get({
        name: 'task',
        message: '\n1: Add Copyright\n2: Crop Image\n3: Add Frame\nEnter task number'
    }, (err, result) => {
        var task = result.task;
        if (err) {
            utils.handlePromptError();
        } else {
            performTaskOnFiles(taskArr[task - 1]);
        }
    });
};

promptLib.start();
getTask();


'use strict';

var fs = require('fs');
var promptLib = require('prompt');
var utils = require('./lib/utils');

var taskArr = [
    require('./lib/resize-pictures'),
    require('./lib/add-copyright')
];

var performTaskOnFiles = (task) => {
    promptLib.get('path', (err, result) => {
        var imgPath;
        if (err) {
            utils.handlePromptError();
        } else {
            imgPath = 'input';
            fs.readdir(imgPath, (err, data) => {
                if (err) {
                    console.log('err', err);
                    console.log('data', data);
                    return;
                }
                data.forEach((i) => {
                    var fullPath = imgPath + '/' + i;
                    if (utils.getExtension(i).toLowerCase() === 'jpg') {
                        task(fullPath);
                    }
                });
            });
        }
    });
};

var getTask = () => {
    promptLib.get({
        name: 'task',
        message: '\n1: Resize Pictures\n2: Add Copyright\n3: Make Collage\nEnter task number'
    }, (err, result) => {
        var task = result.task;
        if (err) {
            utils.handlePromptError();
        } else {
            if (task !== '3') {
                performTaskOnFiles(taskArr[task - 1]);
            } else {
                return;
                // require('./lib/make-collage')();
            }
        }
    });
};

promptLib.start();
getTask();


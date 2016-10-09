'use strict';

var path = require('path');

var getExtension = (filename) => {
    return path.extname(filename).replace('.', ''); 
};

var handlePromptError = (err) => {
    console.log('error getting prompt value', err);
};

module.exports = {
    getExtension: getExtension,
    handlePromptError: handlePromptError
};
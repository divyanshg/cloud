'use strict'

exports.handler = function (event, context, callback) {
    
    var MIN = parseInt(event.min);
    var MAX = parseInt(event.max);

    const data = Math.floor(Math.random() * MAX) + MIN;

    if(callback == null || callback == '') return data
    callback(null, data);
}
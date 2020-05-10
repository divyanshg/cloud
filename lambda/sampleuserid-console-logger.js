'use strict'

exports.handler = function (event, callback) {
    
    var MIN = parseInt(event.min);
    var MAX = parseInt(event.max);

    const data = Math.floor(Math.random() * MAX) + MIN;

    if(callback == null || callback == '') return String(data)
    callback(null, data);
}
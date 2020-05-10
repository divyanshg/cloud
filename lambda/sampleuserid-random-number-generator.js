'use strict'

exports.handler = function (event, callback) {
    
    var MIN = parseInt(event.min);
    var MAX = parseInt(event.max);

    const data = "<h1>This is your Random Number : "+data

    if(callback == null || callback == '') return data
    callback(null, data);
}
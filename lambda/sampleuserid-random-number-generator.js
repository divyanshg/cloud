'use strict'

exports.handler = function (event, callback) {
    
    var MIN = parseInt(event.min);
    var MAX = parseInt(event.max);

    const data = `<h1 style="color:blue">This is your Random Number : <i>${Math.floor(Math.random() * MAX) + MIN}</i></h1>`

    if(callback == null || callback == '') return data
    callback(null, data);
}
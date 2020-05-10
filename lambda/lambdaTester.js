'use strict'

exports.runLambda = (uModule, inputs, callback) => {
    try {
        
        const mod = require(`./${uModule}`)

        return String(mod.handler(inputs, callback)) 

    } catch (e) {
       return "Unable to load lambda function <br> "+ e
    }
}


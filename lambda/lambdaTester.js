'use strict'

exports.runLambda = async (uModule, inputs, callback) => {
    try {
        
        const mod = require(`./${uModule}`)
        await mod;

        return JSON.stringify(mod.handler(JSON.parse(inputs), null, callback))

    } catch (e) {
       return "Cannot find function"
    }
}


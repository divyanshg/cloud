'use strict'

exports.runLambda = async (uModule, inputs, callback) => {
    try {
        
        const mod = require(`./${uModule}`)
        await mod;

        console.log(mod.handler(inputs, callback))
        return mod.handler(inputs, callback)

    } catch (e) {
       return "Cannot find function"
    }
}


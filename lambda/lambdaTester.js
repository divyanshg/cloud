'use strict'

const prompt = require('prompt-sync')();

var uModule = prompt("function name : ");

var testFunction = async () => {
    try {

        const mod = require(`./${uModule}`)
        await mod;
    } catch (e) {
        return console.log("Cannot find function")
    }
    console.log(mod.handler(JSON.parse(prompt("Input Object : ")), null, null))
}

testFunction()
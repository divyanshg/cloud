'use strict'

const prompt = require('prompt-sync')();

var uModule = prompt("function name : ");

var testFunction = async () => {
    const mod = require(`./${uModule}`)
    await mod;

    console.log(mod.handler)
}

testFunction()
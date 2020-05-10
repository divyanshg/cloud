'use strict'

const prompt = require('prompt-sync')();

const module = prompt("function name : ");

var testFunction = async () => {
    const mod = require(`./${module}`)
    await mod;

    console.log(mod.handler)
}

testFunction()
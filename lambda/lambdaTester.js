'use strict'

const prompt = require('prompt-sync')();

var uModule = prompt("function name : ");

var testFunction = async () => {
    try{
    const mod = require(`./${uModule}`)
    await mod;

    console.log(mod.handler(prompt("Input Object : ", null, null)))
    }
    catch(e){
        console.log("Cannot find function")
    }
}

testFunction()
const express = require('express')
const app = express()
const userModule = require('./sampleuserid-random-number-generator')

// Proxy request

app.get('/number', async (req, res) => {
    var input = req.query;
    
    var userEvent = {'max': input.max, 'min': input.min}

    res.send(JSON.stringify(userModule.handler(userEvent, "something", null)));
})

app.get('/string', (req,res) => {
    var input = req.query
    res.send(`HELLO, ${input.firstName} ${input.lastName}`)
})

app.listen(43401, () => {
    console.log("LAMBDA on port 3000");
});
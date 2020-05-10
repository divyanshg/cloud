const express = require('express')
const app = express()
const lambda = require('./lambdaTester')

// Proxy request

app.get('/number', async (req, res) => {
    var input = req.query;
    
    var userEvent = {'max': input.max, 'min': input.min}

    res.send(String(lambda.runLambda('sampleuserid-random-number-generator', userEvent, null)));
})

app.post('/string', (req,res) => {
    var input = req.query
    console.log(`HELLO, ${input.firstName} ${input.lastName}`)
})

app.listen(43401, () => {
    console.log("LAMBDA on port 3000");
});
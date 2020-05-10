const express = require('express')
const app = express()

// Proxy request
app.get('/number', async (req, res) => {
    var input = req.params;
    
    var userEvent = {'max': input.max, 'min': input.min}

    res.send(userModule.handler(userEvent, "something", null).toString());
})

app.listen(43401, () => {
    console.log("LAMBDA on port 3000");
});
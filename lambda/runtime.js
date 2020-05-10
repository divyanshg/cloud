'use strict'

var subdomain = require('express-subdomain');
const express = require('express');
const app = express()
const mysql = require('mysql')
var router = express.Router()

const axios = require('axios')

var con = mysql.createConnection({
    "host": "localhost",
    "user": "divyanshg21",
    "password": "potty_khale",
    "database": "fila_iot"
})

con.connect((err) => {
    if (err) throw err
    console.log("Database is connected!")
})

app.set('subdomain offset', 1);

router.get('/:API', (req, res) => {

    var subDomains = req.subdomains;
    var input = req.query;

    con.query(`select * from cloudDB_apis where user = '${subDomains[1]}' and name = '${subDomains[0]}' and api = '${req.params.API}'`, async (err, api) => {
        if (err) throw err;

        var input = req.query
        
        var inputs = JSON.parse(api[0].inputs)

        var query = ""

        if (inputs.length > 0) {

            inputs.forEach(inp => {

                if(input[inp] == null || typeof input[inp] == 'undefined') res.send(`<h3><b style="color:red;">${inp}</b> was not provided.</h3><br><p style="color:red;">Undefined query input error.</p>`)
                query += `${inp}=${input[inp]}&`

            });

        } else {

            query = ''

        }

        axios[api[0].method](`http://localhost:43401/${req.params.API}?${query}`).then((response) => {

            res.send(String(response.data))

        }).catch((error) => {

            console.log(error);

        })
    })

})

app.use(subdomain('*.*', router))

app.listen(43400,() => {
    console.log("LAMBDA on port 3000");
});
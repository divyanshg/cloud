'use strict'

const express = require('express');
const app = express()
const mysql = require('mysql')

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

app.get('/:API', (req, res) => {

    var subDomains = req.subdomains;
    var input = req.query;

    con.query(`select * from cloudDB_apis where user = '${subDomains[1]}' and name = '${subDomains[0]}' and api = '${req.params.API}'`, async (err, api) => {
        if (err) throw err;

        var input = req.query
        var userModule = require(`./${subDomains[1]}-${subDomains[0]}`);
        await userModule;

        var inputs = JSON.parse(api[0].inputs)

        var query = ""

        inputs.forEach(inp => {
            query += `${inp}=${input.inp}&`
        });

        console.log(query)
        

        axios[api[0].method](`http://localhost:43401/${req.params.API}?min=${input.min}&max=${input.max}`).then((response) => {

            res.send(JSON.stringify(response.data))

        }).catch((error) => {

            console.log(error);

        })
    })

})

app.listen(43400, () => {
    console.log("LAMBDA on port 3000");
});
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

        if (inputs.length > 0) {

            inputs.forEach(inp => {

                if(input[inp] == null || typeof input[inp] == 'undefined') res.send(`${inp} was not provided.`)
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

app.listen(43400, () => {
    console.log("LAMBDA on port 3000");
});
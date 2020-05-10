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

app.get('/', (req, res) => {

    var subDomains = req.subdomains;

    con.query(`select * from cloudDB_apis where user = '${subDomains[1]}' and name = '${subDomains[0]}'`, async (err, api) => {
        if (err) throw err;

        var input = req.query
        var userModule = require(`./${subDomains[1]}-${subDomains[0]}`);
        await userModule;

        axios[api[0].method]("http://localhost:43401/number?min=10&max=20").then((response) => {

            res.send(response.data)

        }).catch((error) => {

            console.log(error);

        })
    })

})

app.listen(43400, () => {
    console.log("LAMBDA on port 3000");
});
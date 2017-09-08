const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'node_test_db'
});
const app = express();
const port = process.env.PORT || 3000;

connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected...');
});

app.get('/todos', (req, res) => {
    connection.query('SELECT * FROM todos', (err, rows, fields) => {
        connection.end();
        if (err) {
            return res.status(400).send(err);
        }
        res.send({rows})
    })
});

app.get('/todos/:username', (req, res) => {
    var username = req.params.username;
    connection.query(`
        SELECT * 
        FROM todos
        WHERE username LIKE '${username}'`
        , (err, rows, fields) => {
            connection.end();
            if(err) {
                return res.status(400).send(err);
            }
            res.send({rows})
        }
    )
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
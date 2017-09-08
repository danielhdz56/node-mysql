const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
});



connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected...');
    connection.query('DROP DATABASE IF EXISTS node_test', (err, results) => {
        if (err) throw err
        console.log('Database dropped');
    });
    connection.query('CREATE DATABASE IF NOT EXISTS node_test', (err, results) => {
        if (err) throw err
        console.log('Database created');
    });
    connection.end(function(err) {
        if (err) throw err
        console.log('You have disconnected');
      });
});
const mysql = require('promise-mysql');

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'node_test_db'
}).then((conn) => {
    connection = conn;
    var sql = `
        create table if not exists programming_languages  (
        id integer(11) auto_increment not null,
        languages varchar(30) not null,
        rating integer(10),
        primary key (id)
    )`;
    return connection.query(sql);
}).then(() => {
    var result = connection.query('select * from programming_languages');
    connection.end();
    return result;
}).catch((err) => {
    if (connection && connection.end) connection.end();
    //logs out the error 
    console.log(err);
});
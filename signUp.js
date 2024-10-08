const mysql = require("mysql");
const rxpress = require("express");

const app = rxpress.Router();

function connDatabase() {
    const dbInfo = {
        host: "localhost",
        database: "sales",
        user: "root",
        password: "manager",
        port: 3306
    };
    const connection = mysql.createConnection(dbInfo);
    connection.connect();
    return connection;
}

app.post("/", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const connection = connDatabase();
    connection.query(`insert into signup(us, pass) values ("${req.body.us}", "${req.body.pass}")`, (err, result) => {
        if (err) {
            res.write(JSON.stringify(err));
        }
        else {
            res.write(JSON.stringify(result));
        }
        connection.end();
        res.end();
    });
});

module.exports = app;
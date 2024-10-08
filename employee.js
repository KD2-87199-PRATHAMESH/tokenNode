const mysql = require("mysql");
const express = require("express");

const app = express.Router();

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

app.get("/", (req, res) => {
    const connection = connDatabase();
    const queryText = `select * from salespeople`;
    res.setHeader("Content-Type", "application/json");
    connection.query(queryText, (err, result) => {
        if (err) {
            res.write(JSON.stringify(err));
        }
        else {
            res.write(JSON.stringify(result));
        }
        res.end();
        connection.end();
    });
});

app.get("/:id", (req, res) => {
    const connection = connDatabase();
    connection.query(`select * from salespeople where sid=${req.params.id}`, (err, result) => {
        res.setHeader("Content-Type", "application/json");
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

app.put("/:id", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const connection = connDatabase();
    connection.query(`update salespeople set sname="${req.body.sname}", sid=${req.body.sid} where sid=${req.body.sid}`, (err, result) => {
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

app.post("/", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const connection = connDatabase();
    const queryText = `insert into salespeople(sname, sid) values("${req.body.sname}", ${req.body.sid})`;
    connection.query(queryText, (err, result) => {
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

app.delete("/:id", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const connection = connDatabase();
    connection.query(`delete from salespeople where sid=${req.params.id}`, (err, result) => {
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
const mysql = require("mysql");
const rxpress = require("express");
const jwt = require("jsonwebtoken");

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
    connection.query(`select * from signup where us="${req.body.us}"`, (err, result) => {
        if (err) {
            res.write(JSON.stringify(err));
        }
        else {
            if (result.length != 0) {
                if (result[0].pass == req.body.pass) {
                    res.write(JSON.stringify({
                        username: 1,
                        password: 1,
                        token: jwt.sign({
                            user: req.body.us,
                            pass: req.body.pass
                        }, "qaz", { expiresIn: '120s' })
                    }));
                }
                else {
                    res.write(JSON.stringify({
                        username: 1,
                        password: 0
                    }));
                }
            }
            else {
                res.write(JSON.stringify({
                    username: 0,
                    password: 0
                }));
            }
        }
        connection.end();
        res.end();
    });
});



module.exports = app;
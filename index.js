const cors = require('cors');
const express = require('express');
const app = express();
const emp = require("./routes/employee");
const sig = require("./routes/signUp");
const sin = require("./routes/signIn");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    const token = req.headers["authorization"];
    res.setHeader("Content-Type", "application/json");

    if (req.url.includes("signin") || req.url.includes("signup")) {
        next();
    }
    else {
        if (token != undefined) {
            jwt.verify(token, "qaz", (err, decoded) => {
                if (err) {
                    // console.log("not valid");
                    res.write(JSON.stringify({ isValid: 0 }));
                    res.end();
                }
                else {
                    // console.log("valid");
                    next();
                }
            });
        }
        else {
            // console.log("not valid");
            res.write(JSON.stringify({ isValid: 0 }));
            res.end();
        }
    }
});

app.use("/employee", emp);
app.use("/signup", sig);
app.use("/signin", sin);
app.listen(9999, () => console.log("Server running at 9999...!"));
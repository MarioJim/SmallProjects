const express = require("express");

let app = express();

app.get("/", (req, res) => {
  res.status(403).send({
    error: "Forbidden",
    name: "This.app 1.0.0"
  });
});

app.get("/users", (req, res) => {
  res.send([{
    name: "Mario 1",
    age: 18
  }, {
    name: "Mario 2",
    age: 19
  }, {
    name: "Mario 3",
    age: 20
  }]);
});

app.listen(3000);

module.exports.app = app;

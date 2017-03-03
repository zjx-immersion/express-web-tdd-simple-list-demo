var express = require('express');
var app = express();

app.get('/', (req, res) => {

    // throw Error;
    res.send('OK');
});

// app.listen(3000);
module.exports = app;
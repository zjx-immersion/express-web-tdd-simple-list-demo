var express = require('express');
var app = express();

// app.get('/', (req, res) => {

//     // throw Error;
//     res.send('OK');
// });

app.use(express.static('public'));

app.get('/cities', (req, res) => {
    var cities = ['Lotopia', 'Caspiana', 'Indigo'];
    res.json(cities);
});

// app.listen(3000);
module.exports = app;
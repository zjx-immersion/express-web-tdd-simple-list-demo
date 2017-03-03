var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// app.get('/', (req, res) => {

//     // throw Error;
//     res.send('OK');
// });

app.use(express.static('public'));
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cities = {
    'Lotopia': 'simple desc',
    'Caspiana': 'simple desc',
    'Indigo': 'simple desc'
};


app.get('/cities', (req, res) => {
    res.json(Object.keys(cities));
});

app.post('/cities', (req, res) => {
    var newCity = req.body;
    cities[newCity.name] = newCity.description;
    res.status(201).json(newCity.name);
});
// app.listen(3000);
module.exports = app;
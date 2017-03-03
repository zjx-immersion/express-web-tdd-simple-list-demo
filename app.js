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

//init data in redis
// client.hset('cities', 'Lotopia', 'simple desc');
// client.hset('cities', 'Caspiana', 'simple desc');
// client.hset('cities', 'Indigo', 'simple desc');

// var cities = {
//     'Lotopia': 'simple desc',
//     'Caspiana': 'simple desc',
//     'Indigo': 'simple desc'
// };

var route = require('./route/cities');
app.use('/cities', route);


// app.listen(3000);
module.exports = app;
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

var redis = require('redis');
var client = redis.createClient();

// console.log("Node Env: " + process.env.NODE_ENV + (process.env.NODE_ENV || 'development').length);
client.select((process.env.NODE_ENV || 'development').length);

//init data in redis
// client.hset('cities', 'Lotopia', 'simple desc');
// client.hset('cities', 'Caspiana', 'simple desc');
// client.hset('cities', 'Indigo', 'simple desc');

// var cities = {
//     'Lotopia': 'simple desc',
//     'Caspiana': 'simple desc',
//     'Indigo': 'simple desc'
// };


app.get('/cities', (req, res) => {
    client.hkeys('cities', (err, names) => {
        // res.json(Object.keys(cities));
        res.json(names);

    });
});

app.post('/cities', (req, res) => {
    var newCity = req.body;

    if (!newCity.name || !newCity.description) {
        res.sendStatus(400);
        return false;
    }
    client.hset('cities', newCity.name, newCity.description, (err) => {
        if (err) throw err;
        // cities[newCity.name] = newCity.description;
        res.status(201).json(newCity.name);
    })

});

app.delete('/cities/:name', (req, res) => {
    client.hdel('cities', req.params.name, (err) => {
        if (err) throw err;
        res.sendStatus(204);
    });
});

app.get('/cities/:name', (req, res) => {
    client.hget('cities', req.params.name, (err, description) => {
        res.render('show.ejs', {
            city: {
                name: req.params.name,
                description: description
            }
        });

    });
});

// app.listen(3000);
module.exports = app;
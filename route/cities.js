var express = require('express');


var redis = require('redis');
var client = redis.createClient();

// console.log("Node Env: " + process.env.NODE_ENV + (process.env.NODE_ENV || 'development').length);
client.select((process.env.NODE_ENV || 'development').length);

var router = express.Router();


router.get('/', (req, res) => {
        client.hkeys('cities', (err, names) => {
            // res.json(Object.keys(cities));
            res.json(names);

        });
    })
    .post('/', (req, res) => {
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

    })
    .delete('/:name', (req, res) => {
        client.hdel('cities', req.params.name, (err) => {
            if (err) throw err;
            res.sendStatus(204);
        });
    })
    .get('/:name', (req, res) => {
        client.hget('cities', req.params.name, (err, description) => {
            res.render('show.ejs', {
                city: {
                    name: req.params.name,
                    description: description
                }
            });

        });
    });

module.exports = router;
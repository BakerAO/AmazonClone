const express = require('express'); //framework to create HTTP routes
const morgan = require('morgan'); //simplifies logging
const bodyParser = require('body-parser'); //translator
const mongoose = require('mongoose'); //mongodb agent
const cors = require('cors');

const config = require('./config.js');

const app = express();

mongoose.connect(config.database, (err) => {
    if (err) {
        console.log(err);
    } else { 
        console.log('Connected to the database');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res, next) => {
    res.json({
        user: 'BakerAO'
    });
});

app.listen(config.port, (err) => {
    console.log('Awesome happens on port: ' + config.port);
});

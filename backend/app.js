const express = require('express');
const monoose=require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: config.cors.origin,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true
}));

const userRoutes = require('./routes/user');
const teamRoutes = require('./routes/team');

app.use('/users', userRoutes);
app.use('/teams', teamRoutes);

monoose.connect(config.db.url)
.then(result => {
    console.log('Connected to database');
    app.listen(config.port, () => {
        console.log('Server is running on port 4000');
    });
}).catch(err => {
    console.log(err);
})

module.exports = app;

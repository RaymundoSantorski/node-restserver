/* requires */
require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

/* middlewares */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/index'));
app.use(express.static(path.resolve(__dirname, '../public')));

/* mongo config */
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, response) => {
        if (err) throw err;
        console.log('Base de datos online');
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
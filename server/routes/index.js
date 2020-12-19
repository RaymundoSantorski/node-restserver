/* requires */
const express = require('express');
const app = express();

/* middlewares */
app.use(require('./usuario'));
app.use(require('./login'));

/* exports */
module.exports = app;
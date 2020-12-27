/* requires */
const express = require('express');
const app = express();

/* middlewares */
app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./categoria'));
app.use(require('./producto'));

/* exports */
module.exports = app;
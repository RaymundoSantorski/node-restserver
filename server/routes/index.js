/* requires */
const express = require('express');
const app = express();

/* middlewares */
app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./categoria'));
app.use(require('./producto'));
app.use(require('./upload'));
app.use(require('./imagenes'));

/* exports */
module.exports = app;
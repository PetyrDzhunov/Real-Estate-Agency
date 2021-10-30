const express = require('express');

const routes = require('./routes');
const { PORT } = require('./constants');
const { initDatabase } = require('./config/database-config');

const app = express();
require('./config/hbs-config')(app);
require('./config/express-config')(app);

app.use(routes);
initDatabase()
    .then(() => {
        console.log('Database is running now.');
        app.listen(PORT, () => console.log(`The app is running on http://localhost:${PORT}/`));
    })
    .catch(err => {
        console.log('Cannot connect database', err);
    });
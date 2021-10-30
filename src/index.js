const express = require('express');
const app = express();
const port = 5000;
require('./config/hbs-config')(app);
require('./config/express-config')(app);


app.get('/', (req, res) => {
    res.render('home', { layout: false });
});


app.listen(port, () => console.log(`The app is running on http://localhost:${port}/`));
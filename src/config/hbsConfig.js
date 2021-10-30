const handlebars = require('express-handlebars');

function hbsConfig(app) {
    app.engine('hbs', handlebars({

    }));

    app.set('view engine', 'hbs');
}
const express = require('express');
const app = express();
const { PORT } = require('./constants');
const routes = require('./routes');
require('./config/hbs-config')(app);
require('./config/express-config')(app);

app.use(routes);





app.listen(PORT, () => console.log(`The app is running on http://localhost:${PORT}/`));
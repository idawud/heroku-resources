const express = require('express');
const routes = require('./routes/resources');
require('custom-env').env(true);

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/', routes);

module.exports = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

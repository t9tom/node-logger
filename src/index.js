const express = require('express');
const app = express();

const router = require('./router');

const logger = require("./logger").Logger;

app.use('/', router);

app.listen(3000, () => {
    console.log('Listening on port 3000');
    logger.info("Listening on port 3000 - INFO");
    logger.warn("Listening on port 3000 - WARN");
    logger.error("Listening on port 3000 - ERROR");
});

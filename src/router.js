const express = require('express');
const router = new express.Router();

router.get('/', (req, res, next) => {
    res.json({
        status: 200,
        message: "Hello world"
    });
});

module.exports = router;

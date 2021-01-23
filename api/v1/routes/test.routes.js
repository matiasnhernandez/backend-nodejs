const express = require("express");
const router = express.Router();
const response = require('./../response/response')

router.get('/', function(req, res) {
    res.send(response.build(false, 200, 'Api funcionando correctamente'))
});

module.exports = router;
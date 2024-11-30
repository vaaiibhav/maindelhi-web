var express = require('express');
var router = express.Router();
const knex = require('../knex');
const moment = require("moment-timezone");
var path = require('path');

router.get('/', function (req, res, next) {
    knex('delhi_teer').select('*').orderBy("id", "desc").then(teer_result => {
        res.render('delhi_teer_panel', { result: teer_result })
    }).catch(err => {
        console.log(err);
    })

})


module.exports = router;

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../db/connection');
const demos = db.get('demos');


router.get('/', (req,res) => {
    demos.find().then((result) => {
        res.json(result);
    }) 
    });
module.exports = router;


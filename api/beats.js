const express = require('express');
const router = express.Router();
const db = require('../db/connection.js');
const demos = db.get('demos');
const beats = db.get('beats');
const Joi = require('joi');


const schema = Joi.object({
    name: Joi.string().regex(/^\w+(?:\s+\w+)*$/).max(30),
    price: Joi.number(),
    image:Joi.string().uri({
        scheme: [
            /https/
        ]
        }),
    track: Joi.string().uri({
        scheme: [
            /https/
        ]
        }),
    });

router.post('/beats', (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error === undefined) {
        const beat = {
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            tarck: req.body.track
        };
        beats.insert(beat).then((beat) => {
                res.json(beat);
             });
    } else {
        const error = new Error(result.error);
        res.status(422);
        next(error);
    }
});
router.post('/demos', (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error === undefined) {
        const demo = {
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            tarck: req.body.track
        };
        demos.insert(demo).then((demo) => {
                res.json(demo);
             });
    } else {
        const error = new Error(result.error);
        res.status(422);
        next(error);
    }
});

router.patch('/beats/:id', async (req,res,next) => {
    const {id : _id } = req.params;
    try {
        const result = schema.validate(req.body);
        const query = {_id};
        if (result.error ===undefined) {
            const beat = await beats.findOne(query);
            if (beat) {
                const updatedBeat = req.body
                const result = await beats.findOneAndUpdate(query, {
                    $set: updatedBeat
                });
                res.json(result);
            } else {
                next();
            }
        } else {
            res.status(422);
            throw new Error(result.error);
        }
    } catch(error) {
        next(error);
    }
});
router.patch('/demos/:id', async (req,res,next) => {
    const {id : _id } = req.params;
    try {
        const result = schema.validate(req.body);
        const query = {_id};
        if (result.error ===undefined) {
            const demo = await demos.findOne(query);
            if (demo) {
                const updatedDemo = req.body
                const result = await demos.findOneAndUpdate(query, {
                    $set: updatedDemo
                });
                res.json(result);
            } else {
                next();
            }
        } else {
            res.status(422);
            throw new Error(result.error);
        }
    } catch(error) {
        next(error);
    }
})
module.exports = router;


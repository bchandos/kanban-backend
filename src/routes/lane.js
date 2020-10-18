const express = require('express');
const router = express.Router();
const sequelize = require('../models');

const Lane = sequelize.models.Lane;

router.get('/:id?', async (req, res) => {
    // Read a lane
    if (req.params.id) {
        const lanes = await Lane.findByPk(req.params.id);
        return res.json(lanes);
    } else {
        const lanes = await Lane.findAll();
        return res.json(lanes);
    }
})

router.post('/', async (req, res) => {
    // Create a lane
    const body = req.body;
    const lane = await Lane.create({
        name: body.name,
    })
    return res.json(lane);
})

router.put('/:id?', async (req, res) => {
    // Update a lane
    const laneId = req.params.id || req.body.id;
    const lane = await Lane.findByPk(laneId);
    lane.name = req.body.name;
    await lane.save();
    return res.json(lane);
})

router.delete('/:id?', async (req, res) => {
    const laneId = req.params.id || req.body.id;
    const lane = await Lane.findByPk(laneId);
    await lane.destroy();
    return res.json(`Lane with id ${req.body.id} destroyed`);
})

module.exports = router;
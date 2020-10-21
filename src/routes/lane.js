const express = require('express');
const router = express.Router();
const sequelize = require('../models');

const Lane = sequelize.models.Lane;

// CRUD

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
        BoardId: body.boardId,
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
    return res.json({'status': 'ok', 'id': req.body.id});
})

// Other routes

router.get('/:id/cards', async (req, res) => {
    // Get all a specific lane's cards
    const lane = await Lane.findByPk(req.params.id);
    if (lane) {
        return res.json(await lane.getOrderedCards());
    } else {
        return res.json([]);
    }
})


module.exports = router;
const express = require('express');
const router = express.Router();
const sequelize = require('../models');
const { authenticateToken } = require('./jwt');

const Lane = sequelize.models.Lane;

// Specific routes

router.put('/reorder', authenticateToken, async (req, res) => {
    const newOrder = req.body.newOrder;
    const lanes = await Promise.all(
        newOrder.map( async (id, index) => {
            const lane = await Lane.findByPk(id);
            return await lane.update({sortOrder: index + 1});
        })
    );
    return res.json(lanes);
});

router.get('/:id/cards', authenticateToken, async (req, res) => {
    // Get all a specific lane's cards
    const lane = await Lane.findByPk(req.params.id);
    if (lane) {
        return res.json(await lane.getOrderedCards());
    } else {
        return res.json([]);
    }
})


// CRUD

router.get('/:id?', authenticateToken, async (req, res) => {
    // Read a lane
    if (req.params.id) {
        const lanes = await Lane.findByPk(req.params.id);
        return res.json(lanes);
    } else {
        const lanes = await Lane.findAll();
        return res.json(lanes);
    }
})

router.post('/', authenticateToken, async (req, res) => {
    // Create a lane
    const body = req.body;
    const lane = await Lane.create({
        name: body.name,
        BoardId: body.boardId,
    })
    return res.json(lane);
})

router.put('/:id', authenticateToken, async (req, res) => {
    // Update a lane
    const laneId = req.params.id || req.body.id;
    const lane = await Lane.findByPk(laneId);
    lane.name = req.body.name;
    const newLane = await lane.save();
    return res.json(newLane);
})

router.delete('/:id', authenticateToken, async (req, res) => {
    const laneId = req.params.id || req.body.id;
    const lane = await Lane.findByPk(laneId);
    await lane.destroy();
    return res.json({'status': 'ok', 'id': req.body.id});
})

module.exports = router;
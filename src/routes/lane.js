const express = require('express');
const router = express.Router();
const sequelize = require('../models');
const { authenticateToken } = require('./jwt');

const Lane = sequelize.models.Lane;
const Card = sequelize.models.Card;
const Todo = sequelize.models.Todo;

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
});

router.post('/:id/duplicate', authenticateToken, async (req, res) => {
    // Create a new lane based upon the ID provided
    const sourceLane = await Lane.findByPk(req.params.id);
    const newLane = await Lane.create({
        name: `${sourceLane.name} (copy)`,
        BoardId: sourceLane.BoardId,
    });
    const sourceCards = await sourceLane.getOrderedCards();
    // Iterate over cards and duplicate
    for (let sourceCard of sourceCards) {
        const newCard = await Card.create({
            LaneId: newLane.id,
            name: sourceCard.name,
            contents: sourceCard.contents,
            sortOrder: sourceCard.sortOrder,
        });
        const sourceTodos = await sourceCard.getOrderedTodos();
        for (let sourceTodo of sourceTodos) {
            const newTodo = await Todo.create({
                name: sourceTodo.name,
                sortOrder: sourceTodo.sortOrder,
                complete: sourceTodo.complete,
                CardId: newCard.id
            });
        }
    }
    return res.json(newLane);
});


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
});

router.post('/', authenticateToken, async (req, res) => {
    // Create a lane
    const body = req.body;
    const lane = await Lane.create({
        name: body.name,
        BoardId: body.boardId,
    })
    return res.json(lane);
});

router.put('/:id', authenticateToken, async (req, res) => {
    // Update a lane
    const laneId = req.params.id || req.body.id;
    const lane = await Lane.findByPk(laneId);
    lane.name = req.body.name;
    const newLane = await lane.save();
    return res.json(newLane);
});

router.delete('/:id', authenticateToken, async (req, res) => {
    const laneId = req.params.id || req.body.id;
    const lane = await Lane.findByPk(laneId);
    await lane.destroy();
    return res.json({'status': 'ok', 'id': req.body.id});
});

module.exports = router;
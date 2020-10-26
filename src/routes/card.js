const express = require('express');
const router = express.Router();
const sequelize = require('../models');

const Card = sequelize.models.Card;

// Specific routes

router.put('/reorder', async (req, res) => {
    const newOrder = req.body.newOrder;
    const cards = await Promise.all(
        newOrder.map( async (id, index) => {
            const card = await Card.findByPk(id);
            return await card.update({sortOrder: index + 1});
        })
    );
    return res.json(cards);
});

router.get('/:id/todos', async (req, res) => {
    // Get all a specific card's todos
    const card = await Card.findByPk(req.params.id);
    if (card) {
        return res.json(await card.getOrderedTodos());
    } else {
        return res.json([]);
    }
})

router.get('/:id/completion', async (req, res) => {
    // Get a card's completion percentage
    // A poor substitute for a class property or virtual field but 
    // Sequelize does not support async functions there
    const card = await Card.findByPk(req.params.id);
    if (card) {
        const todos = await card.getTodos();
        if (todos) {
            const completedTodos = todos.filter(todo => todo.complete);
            const completionPercentage = completedTodos.length / todos.length;
            return res.json({
                value: completionPercentage
            });
        } else {
            return res.json({value: 0});
        }
    } else {
        return res.json();
    }
})

// CRUD

router.get('/:id?', async (req, res) => {
    // Read a card
    if (req.params.id) {
        const cards = await Card.findByPk(req.params.id);
        return res.json(cards);
    } else {
        const cards = await Card.findAll();
        return res.json(cards);
    }
})

router.post('/', async (req, res) => {
    // Create a card
    const body = req.body;
    const card = await Card.create({
        name: body.name,
        LaneId: body.laneId,
    });
    const cards = await Card.scope('ordered').findAll({
        where: {
            LaneId: body.laneId
        }
    });
    return res.json(cards);
})

router.put('/:id', async (req, res) => {
    // Update a card
    const cardId = req.params.id || req.body.id;
    const card = await Card.findByPk(cardId);
    const updatedCard = await card.update({
        name: req.body.name || card.name,
        LaneId: req.body.laneId || card.LaneID,
        contents: req.body.contents || card.contents,
        completionPercentage: req.body.completionPercentage || card.completionPercentage,
    });
    return res.json(updatedCard);
})

router.delete('/:id', async (req, res) => {
    const cardId = req.params.id || req.body.id;
    const card = await Card.findByPk(cardId);
    await card.destroy();
    return res.json({'status': 'ok', 'id': req.body.id});
})

module.exports = router;
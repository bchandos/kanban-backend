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
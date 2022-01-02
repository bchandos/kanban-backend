const express = require('express');
const router = express.Router();
const sequelize = require('../models');
const { authenticateToken } = require('./jwt');

const Todo = sequelize.models.Todo;

// Specific routes

router.put('/reorder', authenticateToken, async (req, res) => {
    const newOrder = req.body.newOrder;
    const todos = await Promise.all(
        newOrder.map( async (id, index) => {
            const todo = await Todo.findByPk(id);
            return await todo.update({sortOrder: index + 1});
        })
    );
    return res.json(todos);
});

// CRUD

router.get('/:id?', authenticateToken, async (req, res) => {
    // Read a todo
    if (req.params.id) {
        const todos = await Todo.findByPk(req.params.id);
        return res.json(todos);
    } else {
        const todos = await Todo.findAll();
        return res.json(todos);
    }
})

router.post('/', authenticateToken, async (req, res) => {
    // Create a todo
    const body = req.body;
    const todo = await Todo.create({
        name: body.name,
        CardId: body.cardId,
    });
    const todos = await Todo.scope('ordered').findAll({
        where: {
            CardId: body.cardId
        }
    });
    return res.json(todos);
})

router.put('/:id', authenticateToken, async (req, res) => {
    // Update a todo
    const todoId = req.params.id || req.body.id;
    const todo = await Todo.findByPk(todoId);
    const updatedTodo = await todo.update({
        name: req.body.name || todo.name,
        CardId: req.body.cardId || todo.CardId,
        complete: req.body.complete,
        note: req.body.note ?? todo.note,
    });
    return res.json(updatedTodo);
})

router.delete('/:id', authenticateToken, async (req, res) => {
    const todoId = req.params.id || req.body.id;
    const todo = await Todo.findByPk(todoId);
    await todo.destroy();
    return res.json({'status': 'ok', 'id': req.body.id});
})

module.exports = router;
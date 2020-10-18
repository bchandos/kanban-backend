const express = require('express');
const router = express.Router();
const Board = require('../models/board');

router.get('/:id?', async (req, res) => {
    // Read a board
    if (req.params.id) {
        const boards = await Board.findByPk(req.params.id);
        return res.json(boards);
    } else {
        const boards = await Board.findAll();
        return res.json(boards);
    }
})

router.post('/', async (req, res) => {
    // Create a board
    const body = req.body;
    const board = await Board.create({
        name: body.name,
    })
    return res.json(board);
})

router.put('/:id?', async (req, res) => {
    // Update a board
    const boardId = req.params.id || req.body.id;
    const board = await Board.findByPk(boardId);
    board.name = body.name;
    await board.save();
    return res.json(board);
})

router.delete('/:id?', async (req, res) => {
    const boardId = req.params.id || req.body.id;
    const board = await Board.findByPk(boardId);
    await board.destroy();
    return res.json(`Board with id ${req.body.id} destroyed`);
})

module.exports = router;
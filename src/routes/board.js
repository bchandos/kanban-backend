const express = require('express');
const router = express.Router();
const sequelize = require('../models');
const { authenticateToken } = require('./jwt');

const Board = sequelize.models.Board;

// CRUD 

router.get('/:id', authenticateToken, async (req, res) => {
    // Read a board
    const boards = await Board.findByPk(req.params.id);
    return res.json(boards);
})

router.post('/', authenticateToken, async (req, res) => {
    // Create a board
    const body = req.body;
    const board = await Board.create({
        name: body.name,
        UserId: body.userId
    })
    return res.json(board);
})

router.put('/:id?', authenticateToken, async (req, res) => {
    // Update a board
    const boardId = req.params.id || req.body.id;
    const board = await Board.findByPk(boardId);
    board.name = req.body.name;
    await board.save();
    return res.json(board);
})

router.delete('/:id?', authenticateToken, async (req, res) => {
    const boardId = req.params.id || req.body.id;
    const board = await Board.findByPk(boardId);
    await board.destroy();
    return res.json(`Board with id ${req.body.id} destroyed`);
})

// Other routes

router.get('/:id/lanes', authenticateToken, async (req, res) => {
    // Get all a specific board's lanes
    const board = await Board.findByPk(req.params.id);
    if (board) {
        return res.json(await board.getLanes());
    } else {
        return res.json([]);
    }
})


module.exports = router;
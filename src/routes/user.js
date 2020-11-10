const express = require('express');
const router = express.Router();
const sequelize = require('../models');

const User = sequelize.models.User;

// CRUD

router.get('/:id?', async (req, res) => {
    // Read a user
    if (req.params.id) {
        const users = await User.findByPk(req.params.id);
        return res.json(users);
    } else {
        const users = await User.findAll();
        return res.json(users);
    }
})

// router.post('/', async (req, res) => {
//     // Create a user
//     const user = await User.create({
//         name: req.body.name,
//         password: req.body.password,
//     })
//     return res.json(user);
// })

router.put('/:id?', async (req, res) => {
    // Update a user
    const userId = req.params.id || req.body.id;
    const user = await User.findByPk(userId);
    user.name = req.body.name;
    await user.save();
    return res.json(user);
})

router.delete('/:id?', async (req, res) => {
    const userId = req.params.id || req.body.id;
    const user = await User.findByPk(userId);
    await user.destroy();
    return res.json(`User with id ${req.body.id} destroyed`);
})

// Other routes

router.get('/:id/boards', async (req, res) => {
    // Get all a specific user's boards
    const user = await User.findByPk(req.params.id);
    return res.json(await user.getBoards());
})

module.exports = router;
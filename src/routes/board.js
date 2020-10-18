const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Read a board
    return res.json(`${req.method} request sent to ${req.originalUrl}`);
})

router.post('/', (req, res) => {
    // Create a board
    return res.json(`${req.method} request sent to ${req.originalUrl}`);
})

router.put('/', (req, res) => {
    // Update a board
    return res.json(`${req.method} request sent to ${req.originalUrl}`);
})

router.delete('/', (req, res) => {
    // Delete a board
    return res.json(`${req.method} request sent to ${req.originalUrl}`);
})

module.exports = router;
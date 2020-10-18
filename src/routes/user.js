const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Read a user
    return res.json(`${req.method} request sent to ${req.originalUrl}`);
})

router.post('/', (req, res) => {
    // Create a user
    return res.json(`${req.method} request sent to ${req.originalUrl}`);
})

router.put('/', (req, res) => {
    // Update a user
    return res.json(`${req.method} request sent to ${req.originalUrl}`);
})

router.delete('/', (req, res) => {
    // Delete a user
    return res.json(`${req.method} request sent to ${req.originalUrl}`);
})

module.exports = router;
require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize');

// Load models files
const board = require('./board');
const lane = require('./lane');
const user = require('./user');
const card = require('./card');

// Initialize Sequelize objects
const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
});

// Initialize models
const Board = board(sequelize, Model, DataTypes);
const Lane = lane(sequelize, Model, DataTypes);
const User = user(sequelize, Model, DataTypes);
const Card = card(sequelize, Model, DataTypes);

Card.addScope('ordered', {
    order: [
        ['sortOrder', 'ASC'],
        ['id', 'ASC']
    ]
})

// Declare associations
User.hasMany(Board);
Board.hasMany(Lane);
Lane.hasMany(Card);
Lane.hasMany(Card.scope('ordered'), { as: 'orderedCards' });

module.exports = sequelize;
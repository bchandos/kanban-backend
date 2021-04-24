require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize');

// Load models files
const board = require('./board');
const lane = require('./lane');
const user = require('./user');
const card = require('./card');
const todo = require('./todo');

// Initialize Sequelize objects

let sequelize;

if (process.env.ENV=='development') {
    sequelize = new Sequelize({
        dialect: process.env.DB_DIALECT,
        storage: process.env.DATABASE_URL,
    });
} else {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
    });
}

// Initialize models
const Board = board(sequelize, Model, DataTypes);
const Lane = lane(sequelize, Model, DataTypes);
const User = user(sequelize, Model, DataTypes);
const Card = card(sequelize, Model, DataTypes);
const Todo = todo(sequelize, Model, DataTypes);

Card.addScope('ordered', {
    order: [
        ['sortOrder', 'ASC'],
        ['id', 'ASC']
    ]
})

Todo.addScope('ordered', {
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
Card.belongsTo(Lane);
Card.hasMany(Todo);
Card.hasMany(Todo.scope('ordered'), { as: 'orderedTodos'});
Todo.belongsTo(Card);

module.exports = sequelize;
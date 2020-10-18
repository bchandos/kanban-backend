const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class Board extends Model {}

Board.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Board'
});

module.exports = Board;
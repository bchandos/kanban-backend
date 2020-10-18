const board = (sequelize, Model, DataTypes) => {
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
    return Board;
}

module.exports = board;


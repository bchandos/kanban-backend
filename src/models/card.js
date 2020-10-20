const card = (sequelize, Model, DataTypes) => {
    class Card extends Model {}
    Card.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'Card'
    });
    return Card;
}

module.exports = card;


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
        }
    }, {
        sequelize,
        modelName: 'Card'
    });
    return Card;
}

module.exports = card;


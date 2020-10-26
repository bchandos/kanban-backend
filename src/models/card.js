// const allTodos = await this.getTodos();
// const completedTodos = allTodos.filter(t => t.complete);
// return completedTodos.length / allTodos.length;

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
        sortOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 9999
        },
    }, {
        hooks: {
            // Add in a completion percentage value
            // This cannot be done in a VIRTUAL field type because
            // getters and setters cannot be async. Hooks can.
            afterFind: async (cards) => {
                if (Array.isArray(cards)) {
                    for (let card of cards) {
                        const allTodos = await card.getTodos();
                        const completedTodos = allTodos.filter(t => t.complete);
                        if (allTodos.length) {
                            card.dataValues.completedPercentage = completedTodos.length / allTodos.length;
                        } else {
                            card.dataValues.completedPercentage = 0;
                        }
                    }
                } else {
                    const allTodos = await cards.getTodos();
                    const completedTodos = allTodos.filter(t => t.complete);
                    if (allTodos.length) {
                        cards.dataValues.completedPercentage = completedTodos.length / allTodos.length;
                    } else {
                        cards.dataValues.completedPercentage = 0;
                    }
                }
            }
        },
        sequelize,
        modelName: 'Card'
    });
    return Card;
}

module.exports = card;


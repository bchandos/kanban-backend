const todo = (sequelize, Model, DataTypes) => {
    class Todo extends Model {}
    Todo.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sortOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 9999
        },
        complete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultvalue: null,
        }
    }, {
        sequelize,
        modelName: 'Todo'
    });
    return Todo;
}

module.exports = todo;
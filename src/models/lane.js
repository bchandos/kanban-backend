const lane = (sequelize, Model, DataTypes) => {
    class Lane extends Model {}
    Lane.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sortOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 9999
        }
    }, {
        sequelize,
        modelName: 'Lane'
    });
    return Lane;
}

module.exports = lane;


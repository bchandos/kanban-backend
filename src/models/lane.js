const lane = (sequelize, Model, DataTypes) => {
    class Lane extends Model {}
    Lane.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Lane'
    });
    return Lane;
}

module.exports = lane;


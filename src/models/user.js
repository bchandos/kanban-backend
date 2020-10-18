const user = (sequelize, Model, DataTypes) => {
    class User extends Model {}
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'User'
    });
    return User;
}

module.exports = user;


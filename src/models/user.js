const { Sequelize } = require(".");
const bcrypt = require('bcrypt');

const user = (sequelize, Model, DataTypes) => {
    class User extends Model {
        static async authenticate(username, password) {
            const user = await this.findOne({ where: { name: username }});
            if (bcrypt.compareSync(password, user.password)) {
                return user;
            } 
            return null;
        }
    }
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        hooks: {
            beforeCreate: async (user, options) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
        },
        sequelize,
        modelName: 'User'
    });
    return User;
}

module.exports = user;


const { User, Role } = require('../models/index');
const ValidationError = require('../utils/validation-error');

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }


    async isAdmin(userId) {
        try {
            console.log("In repo")
            const user = await User.findByPk(userId);
            console.log(user)
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            console.log(adminRole)
                // if (adminRole !== null)
                //     adminRole.array.forEach(element => {
                //         console.log(element)
                //             // if (element.dataValues.id == user.dataValues.id)
                //             //     return true;

            //     });
            // return user.hasRole(adminRole);

            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getUser(userId) {
        try {
            console.log("getUser in repo")
            const user = await User.findByPk(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;
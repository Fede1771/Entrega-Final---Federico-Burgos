const UserModel = require("../models/user.model.js");

class UserRepository {
    async obtenerUsuarioPorId(id) {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            throw new Error("Error al obtener el usuario");
        }
    }

    async findByEmail(email) {
        try {
            const user = await UserModel.findOne({ email });
            return user;
        } catch (error) {
            console.error("Error al buscar usuario por email:", error);
            throw new Error("Error al buscar usuario por email");
        }
    }

    async save(user) {
        try {
            await user.save();
        } catch (error) {
            console.error("Error al guardar usuario:", error);
            throw new Error("Error al guardar usuario");
        }
    }

    async getAllUsers() {
        try {
            const users = await UserModel.find({}, { password: 0 }); // Exclude password field
            return users;
        } catch (error) {
            console.error("Error al obtener todos los usuarios:", error);
            throw new Error("Error al obtener todos los usuarios");
        }
    }

    async getInactiveUsers(threshold) {
        try {
            const thresholdDate = new Date(Date.now() - threshold);
            const inactiveUsers = await UserModel.find({ last_connection: { $lt: thresholdDate } });
            return inactiveUsers;
        } catch (error) {
            console.error("Error al obtener usuarios inactivos:", error);
            throw new Error("Error al obtener usuarios inactivos");
        }
    }

    async deleteUser(userId) {
        try {
            await UserModel.findByIdAndDelete(userId);
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            throw new Error("Error al eliminar usuario");
        }
    }
}

module.exports = UserRepository;

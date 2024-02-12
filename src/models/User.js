import { DataTypes } from "sequelize";
import sequelize from "../utils/connection.js";

const User = sequelize.define("user", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

export default User;
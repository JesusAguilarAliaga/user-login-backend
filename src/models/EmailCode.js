import { DataTypes } from "sequelize";
import sequelize from "../utils/connection.js";

const EmailCode = sequelize.define("emailCode", {
    code: {
        type: DataTypes.TEXT
    }
    //userId
})

export default EmailCode;
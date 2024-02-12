import EmailCode from "./EmailCode.js";
import User from "./User.js";


EmailCode.belongsTo(User)
User.hasMany(EmailCode)
import EmailCode from "../models/EmailCode.js";
import User from "../models/User.js";
import { catchError } from "../utils/catchError.js";
import bcrypt from "bcrypt"
import crypto from "crypto"
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken"


export const getAllUsers = catchError(async (req, res) => {
    const users = await User.findAll();

    User.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.password;
        return values;
    };

    return res.send(users);
})

export const getOneUser = catchError(async (req, res) => {
    const { id } = req.params
    const result = await User.findByPk(id);

    if(!result) return res.send("User not found").status(404);

    User.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.password;
        return values;
    };

    return res.json(result)
})

export const createUser = catchError(async (req, res) => {
    const { password, email, firstName, frontBaseUrl } = req.body

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newBody = {
        ...req.body,
        password: hashedPassword
    }

    const userCreated = await User.create(newBody)

    User.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.password;
        return values;
    };

    //generate code to verify from email
    const code = crypto.randomBytes(64).toString("hex");

    const bodyCode = {
        code,
        userId: userCreated.id
    }

    await EmailCode.create(bodyCode)

    sendEmail({
        to: email,
        subject: "Verify your email",
        html: `<a href="${frontBaseUrl}/verify_email/${code}">Verify your email</a>`
    })

    return res.json(userCreated)
})

export const deleteUser = catchError(async (req, res) => {
    const { id } = req.params;

    const userDeleted = await User.destroy({ where: {id}})

    if(!userDeleted) return res.send("User not found").status(404);

    return res.send("User deleted")
})

export const updateUser = catchError(async (req, res) => {
    const { id } = req.params;

    const idUser = await User.findByPk(id)

    if(!idUser) return res.status(404).send("User not found")

    const fieldsToDelete = ["email", "password", "isVerified"]

    fieldsToDelete.forEach(field => {
        delete req.body[field]
    })

    const userUpdated = await User.update(req.body, {
        where: { id },
        returning: true
    })

    if(userUpdated[0] === 0) return res.sendStatus(400)

    return res.json(userUpdated[1][0])
})


export const loginUser = catchError(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}})
    if(!user || !user.isVerified) return res.sendStatus(401);

    User.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.password;
        return values;
    };

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) return res.sendStatus(401);

    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn: "24h"}
    )

    return res.json({user, token})
})

export const userLogged = catchError(async (req, res) => {
    const user = req.user;

    return res.json(user)
})


//reset password
export const resetPassword = catchError(async (req, res) => {
    const {email, frontBaseUrl} = req.body
    const user = await User.findOne({where: {email}})
    console.log(user.id)

    if(!user) return res.sendStatus(401);

    const code = crypto.randomBytes(64).toString("hex");

    await EmailCode.create({
        code,
        userId: user.id
    })

    sendEmail({
        to: email,
        subject: "Verify your email",
        html: `<a href="${frontBaseUrl}/reset_password/${code}">Reset your password</a>`
    })

    res.json(user)
})

export const setNewPassword = catchError(async (req, res) => {
    const { password } = req.body;
    const { code } = req.params;
    console.log(password)

    const emailCode = await EmailCode.findOne({where: {code}})
    if(!emailCode) return res.sendStatus(404)

    const user = await User.findByPk(emailCode.userId);
    if(!user) return res.sendStatus(404)

    const hashedPassword = await bcrypt.hash(password, 10)

    await user.update({ 
            password: hashedPassword
        });

    await emailCode.destroy();

    return res.json(user)
})


//verify code
export const verifyUser = catchError(async (req, res) => {
    const { code } = req.params;
    const emailCode = await EmailCode.findOne({where: {code}});

    if(!emailCode) return res.sendStatus(404);

    const user = await User.findByPk(emailCode.userId);

    if(!user) return res.sendStatus(404);

    await user.update({ isVerified: true });

    await emailCode.destroy();

    return res.json(user);
})
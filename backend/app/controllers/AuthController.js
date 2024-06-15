import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
    const {name, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const now = new Date();
    const created_at = now.toISOString();
    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        token: "",
        created_at: created_at,
        updated_at: "",
    });
    try {
        await newUser.save();
        res.status(200).json({newUser: newUser});
    } catch (error) {
        res.sendStatus(400);
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email: email});
        if (!user) return res.sendStatus(401);
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.sendStatus(401);
        const token = await jwt.sign({userId: user._id}, process.env.SECRET_KEY, {
            expiresIn: "5m",
        });

        return res
            .status(200)
            .cookie("token", token, {maxAge: 5 * 60 * 1000, httpOnly: false})
            .send({token});
    } catch (error) {
        res.status(401).json({message: "Err"});
    }
};

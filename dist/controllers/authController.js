"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const password_1 = require("../utils/password");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const profilePhoto = req.file;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        // Check if username is unique
        const existingUser = yield Users_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        const hashedPassword = yield (0, password_1.hashPassword)(password);
        let profilePhotoBase64;
        if (profilePhoto) {
            profilePhotoBase64 = `data:${profilePhoto.mimetype};base64,${profilePhoto.buffer.toString('base64')}`;
        }
        const newUser = new Users_1.default({
            username,
            password: hashedPassword,
            profilePhoto: profilePhotoBase64
        });
        yield newUser.save();
        res.status(201).json({ message: 'User created' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.registerUser = registerUser;
// Login a user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const user = yield Users_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found. Please sign up first.' });
        }
        // Ensure user.password is a string
        if (typeof user.password !== 'string') {
            return res.status(500).json({ message: 'Invalid Credentials' });
        }
        const isMatch = yield (0, password_1.comparePassword)(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username, profilePhoto: user.profilePhoto } });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.loginUser = loginUser;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secretkey');
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
exports.authenticateToken = authenticateToken;

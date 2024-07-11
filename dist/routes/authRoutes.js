"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../middleware/multer"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/register', multer_1.default.single('profilePhoto'), authController_1.registerUser);
router.get('/users/:id', authController_1.userProfile);
router.post('/login', authController_1.loginUser);
exports.default = router;

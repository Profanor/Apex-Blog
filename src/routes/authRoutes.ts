import express from 'express';
import upload from '../middleware/multer';
import { registerUser, loginUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', upload.single('profilePhoto'), registerUser);
router.post('/login', loginUser);

export default router;
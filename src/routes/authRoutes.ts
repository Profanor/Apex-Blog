import express from 'express';
import upload from '../middleware/multer';
import { registerUser, loginUser, userProfile } from '../controllers/authController';

const router = express.Router();

router.post('/register', upload.single('profilePhoto'), registerUser);
router.get('/users/:id', userProfile);
router.post('/login', loginUser);

export default router;
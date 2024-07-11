import express from 'express';
import { userProfile } from '../controllers/authController';

const router = express.Router();

router.get('/users/:id', userProfile);

export default router;
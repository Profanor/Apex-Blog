import express from 'express';
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controllers/postController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, createPost);
router.get('/', authenticateToken, getPosts);
router.get('/:postId', authenticateToken, getPostById);
router.put('/:postId', authenticateToken, updatePost);
router.delete('/:postId', authenticateToken, deletePost);

export default router;
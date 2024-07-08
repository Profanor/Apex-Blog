import { Response, Request } from 'express';
import Post from '../models/Posts';
import logger from '../logger';


// Middleware for handling errors
const handleErrors = (res: Response, error: any, customMessage?: string) => {
    logger.error(customMessage || 'An error occurred:', error);
    return res.status(500).json({ error: customMessage || 'Internal server error' });
};


// Create a blog post
export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, author } = req.body;

        // input validation check for empty fields
        if (!title || !content || !author) {
            return res.status(400).json({ error: 'All fields are required'});
        }
        // create a new blog post
        const newPost = new Post({ title, content, author });
        await newPost.save();

        // respond with a success message and the created post object
        return res.status(201).json( { message: 'Your post was created successfully', newPost });

    }   catch(error) {
        return handleErrors(res, error, 'An error occurred while trying to create that post');
    }
};


// Get all blog posts
export const getPosts = async ( req:Request, res: Response ) => {
    try {
        const posts = await Post.find();

        return res.status(200).json({ message: 'OK', posts: posts });

    }   catch(error) {
        return handleErrors(res, error, 'An error occured fetching blog posts');
    }
}; 

// Get a single blog post by its ID
export const getPostById = async ( req:Request, res: Response ) => {
    try {
        let postId = req.params.postId;

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({ error: 'Post with the specified ID was not found' });
        }
        return res.status(200).json({message: 'OK', post});
    }   catch(error) {
        return handleErrors(res, error);
    }
};

// Update an existing blog post
export const updatePost = async ( req:Request, res: Response ) => {
    try {
        const { title, content } = req.body;

        // input validation check for empty fields
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and Content fields are required' });
        }

        let postId = req.params.postId;

        const updatedPost = await Post.findByIdAndUpdate(postId, { title, content, }, { new: true});

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json({message: 'Post updated successfully', updatedPost});
    }   catch(error) {
        return handleErrors(res, error);
    }
};


// Delete a blog post
export const deletePost = async ( req:Request, res: Response ) => {
    try {
        let postId = req.params.postId;

        const post = await Post.findByIdAndDelete(postId);

        if(!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(204).send();
    }   catch(error) {
        return handleErrors(res, error);
    }
};

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
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const Posts_1 = __importDefault(require("../models/Posts"));
const logger_1 = __importDefault(require("../logger"));
const multer_1 = __importDefault(require("multer"));
// Configure multer for file upload
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
// Middleware for handling errors
const handleErrors = (res, error, customMessage) => {
    logger_1.default.error(customMessage || 'An error occurred:', error);
    return res.status(500).json({ error: customMessage || 'Internal server error' });
};
// Create a blog post
exports.createPost = [
    upload.single('image'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { title, content } = req.body;
            const image = req.file;
            const author = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            // input validation check for empty fields
            if (!title || !content || !author) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            // create a new blog post
            const newPost = new Posts_1.default({
                title,
                content,
                author,
                image: image ? {
                    data: image.buffer,
                    contentType: image.mimetype
                } : undefined
            });
            yield newPost.save();
            // respond with a success message and the created post object
            return res.status(201).json({ message: 'Your post was created successfully', newPost });
        }
        catch (error) {
            return handleErrors(res, error, 'An error occurred while trying to create that post');
        }
    })
];
// Get all blog posts
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Posts_1.default.find();
        return res.status(200).json({ message: 'OK', posts });
    }
    catch (error) {
        return handleErrors(res, error, 'An error occurred fetching blog posts');
    }
});
exports.getPosts = getPosts;
// Get a single blog post by its ID
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        // Populate the author field with the username
        const post = yield Posts_1.default.findById(postId).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ error: 'Post with the specified ID was not found' });
        }
        return res.status(200).json({ message: 'OK', post });
    }
    catch (error) {
        return handleErrors(res, error);
    }
});
exports.getPostById = getPostById;
// Update an existing blog post
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { title, content } = req.body;
        // input validation check for empty fields
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and Content fields are required' });
        }
        const postId = req.params.postId;
        // Find the post first to check the author
        const post = yield Posts_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        // Debugging logs
        console.log('Post Author:', post.author);
        console.log('User ID:', (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (post.author.toString() !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id)) {
            return res.status(403).json({ error: 'You are not authorized to update this post' });
        }
        // Update the post
        post.title = title;
        post.content = content;
        const updatedPost = yield post.save();
        return res.status(200).json({ message: 'Post updated successfully', updatedPost });
    }
    catch (error) {
        return handleErrors(res, error);
    }
});
exports.updatePost = updatePost;
// Delete a blog post
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const postId = req.params.postId;
        // Find the post first to check the author
        const post = yield Posts_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        // Debugging logs
        console.log('Post Author:', post.author);
        console.log('User ID:', (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (post.author.toString() !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id)) {
            return res.status(403).json({ error: 'You are not authorized to delete this post' });
        }
        yield Posts_1.default.findByIdAndDelete(postId);
        return res.status(204).send();
    }
    catch (error) {
        return handleErrors(res, error);
    }
});
exports.deletePost = deletePost;

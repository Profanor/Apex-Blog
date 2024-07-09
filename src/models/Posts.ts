import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: { 
        data: Buffer, 
        contentType: String 
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
});
const Post = mongoose.model("Post", postSchema);

export default Post;
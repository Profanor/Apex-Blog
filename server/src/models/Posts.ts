import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String
    },
    image: {
      data: Buffer,
      contentType: String
    }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
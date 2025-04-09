import mongoose from 'mongoose';
import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
  content: { 
    type: String, 
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [1000, 'Comment must be less than 1000 characters']
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  authorName: {
    type: String,
    required: true
  },
  post: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'BlogPost', 
    required: true 
  },
  parentComment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment',
    default: null
  },
  likes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: 'active'
  }
}, {
  timestamps: true,
});

// Find comments by post
CommentSchema.statics.findByPost = function(postId) {
  return this.find({ post: postId, status: 'active', parentComment: null }).sort({ createdAt: -1 });
};

// Find comments by author
CommentSchema.statics.findByAuthor = function(authorId) {
  return this.find({ author: authorId, status: 'active' }).sort({ createdAt: -1 });
};

// Find replies to a comment
CommentSchema.statics.findReplies = function(commentId) {
  return this.find({ parentComment: commentId, status: 'active' }).sort({ createdAt: 1 });
};

// Increment likes method
CommentSchema.methods.like = async function() {
  this.likes += 1;
  return this.save();
};

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment; 
import mongoose from 'mongoose';
import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
  content: { 
    type: String, 
    required: [true, '댓글 내용은 필수입니다'],
    trim: true,
    maxlength: [1000, '댓글은 1000자 이내여야 합니다']
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

// 특정 포스트에 달린 댓글 찾기
CommentSchema.statics.findByPost = function(postId) {
  return this.find({ post: postId, status: 'active', parentComment: null }).sort({ createdAt: -1 });
};

// 특정 사용자가 작성한 댓글 찾기
CommentSchema.statics.findByAuthor = function(authorId) {
  return this.find({ author: authorId, status: 'active' }).sort({ createdAt: -1 });
};

// 특정 댓글의 대댓글 찾기
CommentSchema.statics.findReplies = function(commentId) {
  return this.find({ parentComment: commentId, status: 'active' }).sort({ createdAt: 1 });
};

// 좋아요 증가 메소드
CommentSchema.methods.like = async function() {
  this.likes += 1;
  return this.save();
};

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment; 
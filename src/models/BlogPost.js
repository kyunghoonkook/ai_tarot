import mongoose from 'mongoose';
import { Schema, model, models } from 'mongoose';

const BlogPostSchema = new Schema({
  title: { 
    type: String, 
    required: [true, '제목은 필수입니다'],
    trim: true,
    maxlength: [100, '제목은 100자 이내여야 합니다']
  },
  slug: { 
    type: String, 
    required: [true, 'URL 슬러그는 필수입니다'],
    unique: true,
    trim: true,
    lowercase: true
  },
  content: { 
    type: String, 
    required: [true, '내용은 필수입니다'],
  },
  excerpt: { 
    type: String, 
    required: [true, '요약은 필수입니다'],
    maxlength: [300, '요약은 300자 이내여야 합니다']
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
  category: { 
    type: String, 
    required: true,
    enum: ['practice', 'love', 'career', 'health', 'general'],
    default: 'general'
  },
  tags: { 
    type: [String], 
    default: [] 
  },
  image: { 
    type: String,
    default: '/images/symbolBG.png'
  },
  featured: { 
    type: Boolean, 
    default: false 
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  readTime: {
    type: Number,
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
});

// Find posts by author
BlogPostSchema.statics.findByAuthor = function(authorId) {
  return this.find({ author: authorId }).sort({ createdAt: -1 });
};

// Find featured posts
BlogPostSchema.statics.findFeatured = function() {
  return this.find({ featured: true, status: 'published' }).sort({ createdAt: -1 });
};

// Find posts by category
BlogPostSchema.statics.findByCategory = function(category) {
  return this.find({ category, status: 'published' }).sort({ createdAt: -1 });
};

// Find all published posts
BlogPostSchema.statics.findPublished = function() {
  return this.find({ status: 'published' }).sort({ createdAt: -1 });
};

// 조회수 증가 메소드
BlogPostSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

// 좋아요 증가 메소드
BlogPostSchema.methods.like = async function() {
  this.likes += 1;
  return this.save();
};

const BlogPost = models.BlogPost || model('BlogPost', BlogPostSchema);

export default BlogPost; 
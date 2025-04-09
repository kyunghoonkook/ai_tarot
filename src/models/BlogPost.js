import mongoose from 'mongoose';
import { Schema, model, models } from 'mongoose';

const BlogPostSchema = new Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title must be less than 100 characters']
  },
  slug: { 
    type: String, 
    required: [true, 'URL slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  content: { 
    type: String, 
    required: [true, 'Content is required'],
  },
  excerpt: { 
    type: String, 
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt must be less than 300 characters']
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

// Increment views method
BlogPostSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

// Like post method
BlogPostSchema.methods.like = async function() {
  this.likes += 1;
  return this.save();
};

const BlogPost = models.BlogPost || model('BlogPost', BlogPostSchema);

export default BlogPost; 
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import Comment from '@/models/Comment';
import BlogPost from '@/models/BlogPost';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { slugify } from '@/utils/helpers';

// Get blog posts (with optional filtering)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const authorId = searchParams.get('author');
    const skip = (page - 1) * limit;
    
    await connectToDatabase();
    
    // Build query
    const query = { status: 'published' };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (authorId) {
      query.author = authorId;
    }
    
    // Count total posts
    const total = await BlogPost.countDocuments(query);
    
    // Get posts with pagination
    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email profileImage');
    
    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// Create new post (authentication required)
export async function POST(request) {
  try {
    // Check authentication token
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify token
    const decoded = verifyToken(token.value);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token' },
        { status: 401 }
      );
    }
    
    await connectToDatabase();
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { title, content, excerpt, category, tags, image, featured, status } = body;
    
    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // Generate slug and check for duplicates
    let slug = slugify(title);
    let slugExists = await BlogPost.findOne({ slug });
    let counter = 1;
    
    // If slug exists, create a unique one by adding a number
    while (slugExists) {
      slug = `${slugify(title)}-${counter}`;
      slugExists = await BlogPost.findOne({ slug });
      counter++;
    }
    
    // Create new post
    const newPost = new BlogPost({
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 150),
      author: user._id,
      authorName: user.name,
      category: category || 'general',
      tags: tags || [],
      image: image || '/images/symbolBG.png',
      featured: featured || false,
      status: status || 'published',
      readTime: Math.ceil(content.split(' ').length / 200) || 5 // Approximate reading time (200 words per minute)
    });
    
    await newPost.save();
    
    return NextResponse.json(
      { success: true, message: 'Post created successfully', post: newPost },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
} 
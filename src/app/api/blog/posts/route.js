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
    // console.log('Starting blog post creation API');
    // Check authentication token
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      // console.log('No authentication token found');
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify token
    const decoded = verifyToken(token.value);
    if (!decoded || !decoded.userId) {
      // console.log('Token verification failed');
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token' },
        { status: 401 }
      );
    }
    
    // console.log('Token verified successfully, user ID:', decoded.userId);
    await connectToDatabase();
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      // console.log('User not found');
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    // console.log('User found:', user.email);
    
    // Parse request body
    let body;
    try {
      body = await request.json();
      // console.log('Request body successfully parsed');
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { success: false, message: 'Invalid request format: ' + parseError.message },
        { status: 400 }
      );
    }
    
    const { title, content, excerpt, category, tags, image, featured, status } = body;
    // console.log('Request data:', { title, category, status });
    
    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // Generate slug and check for duplicates
    let slug;
    try {
      slug = slugify(title);
      // console.log('Generated slug:', slug);
      let slugExists = await BlogPost.findOne({ slug });
      let counter = 1;
      
      // If slug exists, create a unique one by adding a number
      while (slugExists) {
        slug = `${slugify(title)}-${counter}`;
        slugExists = await BlogPost.findOne({ slug });
        counter++;
      }
    } catch (slugError) {
      console.error('Error generating slug:', slugError);
      return NextResponse.json(
        { success: false, message: 'Error generating post URL: ' + slugError.message },
        { status: 500 }
      );
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
      readTime: body.readTime || Math.max(1, Math.ceil(content.split(' ').length / 200)) // Ensure at least 1 min read time
    });
    
    try {
      // console.log('Attempting to save blog post');
      await newPost.save();
      // console.log('Blog post saved successfully:', newPost._id);
      
      // Add blog post ID to user's blogPosts array
      if (!user.blogPosts) {
        user.blogPosts = [];
      }
      user.blogPosts.push(newPost._id);
      await user.save();
      // console.log('Updated user model with new blog post reference');
    } catch (saveError) {
      console.error('Failed to save blog post:', saveError);
      return NextResponse.json(
        { success: false, message: 'Error saving blog post: ' + saveError.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Post created successfully', post: newPost },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post: ' + error.message },
      { status: 500 }
    );
  }
} 
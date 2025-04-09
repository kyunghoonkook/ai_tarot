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
    console.log('블로그 포스트 생성 API 시작');
    // Check authentication token
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      console.log('인증 토큰 없음');
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify token
    const decoded = verifyToken(token.value);
    if (!decoded || !decoded.userId) {
      console.log('토큰 검증 실패');
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token' },
        { status: 401 }
      );
    }
    
    console.log('토큰 검증 성공, 사용자 ID:', decoded.userId);
    await connectToDatabase();
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log('사용자를 찾을 수 없음');
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    console.log('사용자 찾음:', user.email);
    
    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('Request body successfully parsed');
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { success: false, message: 'Invalid request format: ' + parseError.message },
        { status: 400 }
      );
    }
    
    const { title, content, excerpt, category, tags, image, featured, status } = body;
    console.log('요청 데이터:', { title, category, status });
    
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
      console.log('Generated slug:', slug);
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
      readTime: Math.ceil(content.split(' ').length / 200) || 5 // Approximate reading time (200 words per minute)
    });
    
    try {
      console.log('블로그 포스트 저장 시도');
      await newPost.save();
      console.log('블로그 포스트 저장 성공:', newPost._id);
    } catch (saveError) {
      console.error('블로그 포스트 저장 실패:', saveError);
      return NextResponse.json(
        { success: false, message: '블로그 포스트 저장 중 오류: ' + saveError.message },
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
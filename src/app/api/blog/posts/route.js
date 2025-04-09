import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { slugify } from '@/utils/helpers';

// 모든 게시물 가져오기 또는 필터링된 게시물 가져오기 (쿼리 파라미터 지원)
export async function GET(request) {
  try {
    await connectToDatabase();
    
    // URL 파라미터 파싱
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const slug = url.searchParams.get('slug');
    const authorId = url.searchParams.get('author');
    const featured = url.searchParams.get('featured');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // 단일 게시물 조회 (slug로)
    if (slug) {
      const post = await BlogPost.findOne({ slug, status: 'published' }).populate('author', 'name email profileImage');
      
      if (!post) {
        return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
      }
      
      // 조회수 증가
      await post.incrementViews();
      
      return NextResponse.json({ success: true, post });
    }
    
    // 쿼리 생성
    let query = { status: 'published' };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (authorId) {
      query.author = authorId;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    // 게시물 조회
    const posts = await BlogPost.find(query)
      .populate('author', 'name email profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // 전체 게시물 수 계산
    const total = await BlogPost.countDocuments(query);
    
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

// 새 게시물 생성 (인증 필요)
export async function POST(request) {
  try {
    // 인증 토큰 확인
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // 토큰 검증
    const decoded = verifyToken(token.value);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token' },
        { status: 401 }
      );
    }
    
    await connectToDatabase();
    
    // 사용자 확인
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // 요청 본문 파싱
    const body = await request.json();
    const { title, content, excerpt, category, tags, image, featured, status } = body;
    
    // 필수 필드 검증
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // slug 생성 및 중복 확인
    let slug = slugify(title);
    let slugExists = await BlogPost.findOne({ slug });
    let counter = 1;
    
    // slug가 이미 존재하면 번호를 붙여 고유한 slug 생성
    while (slugExists) {
      slug = `${slugify(title)}-${counter}`;
      slugExists = await BlogPost.findOne({ slug });
      counter++;
    }
    
    // 새 게시물 생성
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
      readTime: Math.ceil(content.split(' ').length / 200) || 5 // 대략적인 읽는 시간 계산 (200단어당 1분)
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
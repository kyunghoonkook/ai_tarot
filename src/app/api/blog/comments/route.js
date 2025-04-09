import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import Comment from '@/models/Comment';
import BlogPost from '@/models/BlogPost';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

// 댓글 목록 가져오기 (게시물별 필터링 가능)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('post');
    const parentId = searchParams.get('parent');
    const authorId = searchParams.get('author');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;
    
    await connectToDatabase();
    
    // 쿼리 구성
    const query = { status: 'active' };
    
    if (postId) query.post = postId;
    if (parentId) query.parentComment = parentId;
    if (authorId) query.author = authorId;
    
    // 댓글 수 조회
    const total = await Comment.countDocuments(query);
    
    // 댓글 목록 조회 (최신순)
    const comments = await Comment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email profileImage')
      .populate('parentComment', 'content author');
    
    return NextResponse.json({
      success: true,
      comments,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// 댓글 작성 (인증 필요)
export async function POST(request) {
  try {
    // 인증 확인
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
    
    // 요청 데이터 파싱
    const body = await request.json();
    const { content, postId, parentCommentId } = body;
    
    // 필수 필드 검증
    if (!content) {
      return NextResponse.json(
        { success: false, message: 'Comment content is required' },
        { status: 400 }
      );
    }
    
    if (!postId) {
      return NextResponse.json(
        { success: false, message: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    // 게시물 확인
    const post = await BlogPost.findById(postId);
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // 부모 댓글 확인 (대댓글의 경우)
    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        return NextResponse.json(
          { success: false, message: 'Parent comment not found' },
          { status: 404 }
        );
      }
    }
    
    // 댓글 생성
    const newComment = new Comment({
      content,
      author: user._id,
      authorName: user.name || user.email,
      post: postId,
      parentComment: parentCommentId || null
    });
    
    await newComment.save();
    
    // 신규 댓글 상세 정보 조회
    const populatedComment = await Comment.findById(newComment._id)
      .populate('author', 'name email profileImage')
      .populate('parentComment', 'content author');
    
    return NextResponse.json(
      { success: true, message: 'Comment created successfully', comment: populatedComment },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create comment' },
      { status: 500 }
    );
  }
} 
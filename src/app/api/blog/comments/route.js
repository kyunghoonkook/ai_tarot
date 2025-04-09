import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import Comment from '@/models/Comment';
import BlogPost from '@/models/BlogPost';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

// Get comments (filter by post, parent, or author)
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
    
    // Build query
    const query = { status: 'active' };
    
    if (postId) query.post = postId;
    if (parentId) query.parentComment = parentId;
    if (authorId) query.author = authorId;
    
    // Count total comments
    const total = await Comment.countDocuments(query);
    
    // Fetch comments (newest first)
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

// Create comment (authentication required)
export async function POST(request) {
  try {
    // Check authentication
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
    
    // Verify user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Parse request data
    const body = await request.json();
    const { content, postId, parentCommentId } = body;
    
    // Validate required fields
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
    
    // Verify post exists
    const post = await BlogPost.findById(postId);
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Check parent comment (for replies)
    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        return NextResponse.json(
          { success: false, message: 'Parent comment not found' },
          { status: 404 }
        );
      }
    }
    
    // Create comment
    const newComment = new Comment({
      content,
      author: user._id,
      authorName: user.name || user.email,
      post: postId,
      parentComment: parentCommentId || null
    });
    
    await newComment.save();
    
    // Add comment ID to user's comments array
    if (!user.comments) {
      user.comments = [];
    }
    user.comments.push(newComment._id);
    await user.save();
    console.log('Updated user model with new comment reference');
    
    // Fetch comment with details
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
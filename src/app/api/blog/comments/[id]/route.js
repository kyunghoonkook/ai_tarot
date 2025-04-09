import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import Comment from '@/models/Comment';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

// Get individual comment
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    await connectToDatabase();
    
    const comment = await Comment.findById(id)
      .populate('author', 'name email profileImage')
      .populate('parentComment', 'content author');
    
    if (!comment || comment.status === 'deleted') {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      comment
    });
    
  } catch (error) {
    console.error('Error fetching comment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch comment' },
      { status: 500 }
    );
  }
}

// Update comment (authentication required, author only)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
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
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Find comment to update
    const comment = await Comment.findById(id);
    if (!comment || comment.status === 'deleted') {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // Only author or admin can edit
    if (comment.author.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Permission denied: You can only edit your own comments' },
        { status: 403 }
      );
    }
    
    // Parse request data
    const body = await request.json();
    const { content } = body;
    
    // Validate required fields
    if (!content) {
      return NextResponse.json(
        { success: false, message: 'Comment content is required' },
        { status: 400 }
      );
    }
    
    // Update comment
    comment.content = content;
    comment.isEdited = true;
    comment.updatedAt = new Date();
    
    await comment.save();
    
    // Get updated comment with details
    const updatedComment = await Comment.findById(id)
      .populate('author', 'name email profileImage')
      .populate('parentComment', 'content author');
    
    return NextResponse.json({
      success: true, 
      message: 'Comment updated successfully',
      comment: updatedComment
    });
    
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

// Delete comment (authentication required, author or admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
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
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Find comment to delete
    const comment = await Comment.findById(id);
    if (!comment || comment.status === 'deleted') {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // Only author or admin can delete
    if (comment.author.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Permission denied: You can only delete your own comments' },
        { status: 403 }
      );
    }
    
    // Check for replies (soft delete if has replies)
    const hasReplies = await Comment.exists({ parentComment: id, status: 'active' });
    
    if (hasReplies) {
      comment.status = 'deleted';
      comment.content = 'This comment has been deleted.';
      await comment.save();
    } else {
      await Comment.deleteOne({ _id: id });
    }
    
    // Remove comment ID from user's comments array
    if (user && user.comments && user.comments.length > 0) {
      user.comments = user.comments.filter(commentId => !commentId.equals(comment._id));
      await user.save();
      console.log('Removed comment reference from user model');
    }
    
    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete comment' },
      { status: 500 }
    );
  }
} 
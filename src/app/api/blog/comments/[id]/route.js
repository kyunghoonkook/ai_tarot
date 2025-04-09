import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import Comment from '@/models/Comment';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

// 개별 댓글 조회
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

// 댓글 수정 (인증 필요, 작성자만 가능)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
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
    
    // 수정할 댓글 찾기
    const comment = await Comment.findById(id);
    if (!comment || comment.status === 'deleted') {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // 작성자 본인 또는 관리자만 수정 가능
    if (comment.author.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Permission denied: You can only edit your own comments' },
        { status: 403 }
      );
    }
    
    // 요청 데이터 파싱
    const body = await request.json();
    const { content } = body;
    
    // 필수 필드 검증
    if (!content) {
      return NextResponse.json(
        { success: false, message: 'Comment content is required' },
        { status: 400 }
      );
    }
    
    // 댓글 수정
    comment.content = content;
    comment.isEdited = true;
    comment.updatedAt = new Date();
    
    await comment.save();
    
    // 수정된 댓글 정보 조회
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

// 댓글 삭제 (인증 필요, 작성자 또는 관리자만 가능)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
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
    
    // 삭제할 댓글 찾기
    const comment = await Comment.findById(id);
    if (!comment || comment.status === 'deleted') {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // 작성자 본인 또는 관리자만 삭제 가능
    if (comment.author.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Permission denied: You can only delete your own comments' },
        { status: 403 }
      );
    }
    
    // 대댓글이 있는 경우 상태만 변경 (소프트 삭제)
    const hasReplies = await Comment.exists({ parentComment: id, status: 'active' });
    
    if (hasReplies) {
      comment.status = 'deleted';
      comment.content = '삭제된 댓글입니다.';
      await comment.save();
    } else {
      await Comment.deleteOne({ _id: id });
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
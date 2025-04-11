import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Comment from '@/models/Comment';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { slugify } from '@/utils/helpers';

// 포스트 업데이트 (인증 필요, 작성자만 가능)
export async function PUT(request, { params }) {
  try {
    const { slug } = params;
    
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
    
    // 게시물 찾기
    const post = await BlogPost.findOne({ slug });
    
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }
    
    // 작성자 확인
    if (post.author.toString() !== decoded.userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. You can only update your own posts' },
        { status: 403 }
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
    
    // 새 slug 생성 (제목이 변경된 경우)
    let newSlug = slug;
    if (title && title !== post.title) {
      newSlug = slugify(title);
      // 다른 게시물과의 slug 중복 확인
      const slugExists = await BlogPost.findOne({ slug: newSlug, _id: { $ne: post._id } });
      if (slugExists) {
        // 중복된 경우 숫자 추가
        let counter = 1;
        while (await BlogPost.findOne({ slug: `${newSlug}-${counter}`, _id: { $ne: post._id } })) {
          counter++;
        }
        newSlug = `${newSlug}-${counter}`;
      }
    }
    
    // 게시물 업데이트
    post.title = title;
    post.slug = newSlug;
    post.content = content;
    post.excerpt = excerpt || content.substring(0, 150);
    post.category = category || post.category;
    post.tags = tags || post.tags;
    post.image = image || post.image;
    post.featured = featured !== undefined ? featured : post.featured;
    post.status = status || post.status;
    post.readTime = body.readTime || Math.max(1, Math.ceil(content.split(' ').length / 200));
    
    await post.save();
    
    return NextResponse.json(
      { success: true, message: 'Post updated successfully', post },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// 포스트 삭제 (인증 필요, 작성자만 가능)
export async function DELETE(request, { params }) {
  try {
    const { slug } = params;
    
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
    
    // 게시물 찾기
    const post = await BlogPost.findOne({ slug });
    
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }
    
    // 작성자 확인 (관리자가 아닌 경우)
    const user = await User.findById(decoded.userId);
    if (post.author.toString() !== decoded.userId && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. You can only delete your own posts' },
        { status: 403 }
      );
    }
    
    // 게시물 삭제
    await BlogPost.findByIdAndDelete(post._id);
    
    // 관련 댓글 삭제
    await Comment.deleteMany({ post: post._id });
    
    // 사용자의 blogPosts 배열에서 게시물 ID 제거
    const author = await User.findById(post.author);
    if (author && author.blogPosts && author.blogPosts.length > 0) {
      author.blogPosts = author.blogPosts.filter(id => !id.equals(post._id));
      await author.save();
      // console.log('Removed post reference from user model');
    }
    
    return NextResponse.json(
      { success: true, message: 'Post and comments deleted successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}

// 특정 slug의 포스트 조회 (GET 요청은 포스트 목록 API로 리다이렉트)
export async function GET(request, { params }) {
  try {
    const { slug } = params;
    // console.log('Blog post lookup request:', slug);
    
    await connectToDatabase();
    
    // slug로 게시물 검색 (status: published인 게시물만)
    const post = await BlogPost.findOne({ slug });
    
    if (!post) {
      // console.log('Post not found:', slug);
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }
    
    // console.log('Post found:', post.title);
    
    // 조회수 증가 (에러가 발생해도 응답에 영향 없도록 try-catch로 감싸기)
    try {
      await post.incrementViews();
    } catch (viewError) {
      console.error('Error while incrementing view count:', viewError);
    }
    
    return NextResponse.json({ 
      success: true, 
      post: {
        ...post.toObject(),
        formattedCreatedAt: new Date(post.createdAt).toLocaleString()
      }
    });
    
  } catch (error) {
    console.error('블로그 포스트 조회 중 오류:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post: ' + error.message },
      { status: 500 }
    );
  }
} 
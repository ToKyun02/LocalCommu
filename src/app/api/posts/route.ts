import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, unauthorized, badRequest } from '@/lib/apiUtils';
import PostDao from '@/dao/post';
import { postCreateSchema } from '@/schemas';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const posts = await PostDao.getPosts({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            comments: true,
            postLikes: true,
          },
        },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('데이퍼 페칭 오류 :', error);
    return NextResponse.json(
      { error: '게시글을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.id) {
      return unauthorized();
    }
    const body = await request.json();
    const validation = postCreateSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.message);
    }

    const { title, content } = validation.data;

    const post = await PostDao.createPost({
      data: {
        title,
        content,
        author: {
          connect: { id: user.id },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('게시글 생성 오류 : ', error);
    return NextResponse.json(
      { error: '게시글 생성 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

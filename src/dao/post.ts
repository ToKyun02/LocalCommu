import { db } from '@/lib/db';

interface CreatePostDTO {
  data: {
    title: string;
    content: string;
    author: {
      connect: {
        id: string;
      };
    };
  };
  include: {
    author: {
      select: {
        id: boolean;
        name: boolean;
        image: boolean;
      };
    };
  };
}

interface GetPostsDTO {
  skip: number;
  take: number;
  orderBy: {
    createdAt: 'desc' | 'asc';
  };
  include: {
    author: {
      select: {
        id: boolean;
        name: boolean;
        image: boolean;
      };
    };
    _count: {
      select: {
        comments: boolean;
        postLikes: boolean;
      };
    };
  };
}

export default class PostDao {
  static async createPost(dto: CreatePostDTO) {
    const post = await db.post.create({ ...dto });
    return post;
  }
  static async getPosts(dto: GetPostsDTO) {
    const posts = await db.post.findMany({ ...dto });
    const totalCount = await db.post.count();

    const postsWithLikeCounts = posts.map((post) => ({
      ...posts,
      likeCount: post._count.postLikes,
      commentCount: post._count.comments,
      _count: undefined,
    }));

    return {
      posts: postsWithLikeCounts,
      totalCount,
    };
  }
}

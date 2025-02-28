import { postCreateSchema } from '@/schemas';
import { z } from 'zod';

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
  likeCount: number;
  commentCount: number;
}

export interface PostsParams {
  page: number;
  limit: number;
}

export interface PostsResponse {
  posts: Post[];
  totalCount: number;
}

export type CreateCardRequest = z.infer<typeof postCreateSchema>;

'use client';

import { usePostsQuery } from '@/queries/posts';
import PostCard from './PostCard';

const LIMIT = 5;

export default function PostList() {
  // TODO: 향후 offset 기반 페이지네이션으로 교체 예정
  const { data, isLoading } = usePostsQuery({ limit: LIMIT, page: 1 });

  if (isLoading) return null;

  return (
    <div className='flex flex-col gap-2'>
      {data?.posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}

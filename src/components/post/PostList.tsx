'use client';

import { usePostsQuery } from '@/queries/posts';
import PostCard, { PostCardSkeleton } from './PostCard';
import Pagination from '../ui/Pagination';
import { useState } from 'react';

const LIMIT = 10;

export default function PostList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePostsQuery({ limit: LIMIT, page });

  return (
    <div className='flex flex-col gap-2'>
      {data?.posts.map((post) => <PostCard key={post.id} post={post} />)}
      {isLoading &&
        Array.from({ length: LIMIT }, (_, i) => <PostCardSkeleton key={i} />)}
      {data?.totalCount && (
        <Pagination
          totalCount={data?.totalCount}
          limit={LIMIT}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}

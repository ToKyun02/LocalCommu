'use client';

import { usePostsQuery } from '@/queries/posts';
import PostCard, { PostCardSkeleton } from './PostCard';
import Pagination, { PaginationSkeleton } from '../ui/Pagination';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const LIMIT = 10;

export default function PostList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePostsQuery({ limit: LIMIT, page });

  return (
    <div className='flex flex-col gap-2'>
      <AnimatePresence>
        {data?.posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
      {isLoading && (
        <>
          {Array.from({ length: LIMIT }, (_, i) => (
            <PostCardSkeleton key={i} />
          ))}
          <PaginationSkeleton />
        </>
      )}
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

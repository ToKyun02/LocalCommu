'use client';

import { Dispatch, SetStateAction } from 'react';
import { Button } from './button';
import { Skeleton } from './skeleton';

interface PaginationProps {
  totalCount: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
}

const PAGE_LEN = 5;

export default function Pagination({
  totalCount,
  page,
  setPage,
  limit,
}: PaginationProps) {
  const totalPage = Math.ceil(totalCount / limit);
  const isPrev = page > PAGE_LEN;
  const isNext = Math.ceil(page / PAGE_LEN) * PAGE_LEN + 1 <= totalPage;

  const pageButtons = Array.from(
    {
      length: Math.min(
        PAGE_LEN,
        totalPage - (Math.ceil(page / PAGE_LEN) - 1) * PAGE_LEN,
      ),
    },
    (_, index) => index + (Math.ceil(page / PAGE_LEN) - 1) * PAGE_LEN + 1,
  );

  const onPrevPage = () => {
    setPage((prev: number) => {
      return (Math.ceil(prev / PAGE_LEN) - 2) * PAGE_LEN + 1;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const onNextPage = () => {
    setPage((prev: number) => {
      return Math.ceil(prev / PAGE_LEN) * PAGE_LEN + 1;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSelectPage = (pageNum: number) => {
    setPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='my-6 flex items-center justify-center gap-2'>
      <Button variant='outline' disabled={!isPrev} onClick={onPrevPage}>
        이전
      </Button>
      {pageButtons.map((pageNum) => (
        <Button
          key={pageNum}
          variant={pageNum === page ? 'default' : 'outline'}
          onClick={() => onSelectPage(pageNum)}
        >
          {pageNum}
        </Button>
      ))}

      <Button variant='outline' disabled={!isNext} onClick={onNextPage}>
        이후
      </Button>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className='my-6 flex items-center justify-center gap-2'>
      <Skeleton className='h-9 w-16' />

      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className='h-9 w-9' />
      ))}

      <Skeleton className='h-9 w-16' />
    </div>
  );
}

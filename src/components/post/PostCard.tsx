import { Post } from '@/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa';
import Image from 'next/image';
import emptyProfile from '@/assets/images/empty-profile.jpg';
import { convertDateFormat } from '@/lib/convertDateFormat';
import { Skeleton } from '@/components/ui/skeleton';

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='mb-4 flex items-center justify-between'>
          <h2 className='text-2xl'>{post.title}</h2>
          <div className='flex items-center gap-2'>
            <FaRegThumbsUp className='size-4' />
            <span className='text-sm'>{post.likeCount}</span>
          </div>
        </CardTitle>
        <div className='flex items-center gap-2'>
          <Image
            src={post.author.image ?? emptyProfile}
            alt={`${post.author.name}님의 프로필 이미지`}
            width={24}
            height={24}
            className='rounded-lg'
          />
          <span className='text-sm'>{post.author.name}</span>
          <span className='text-sm'>{convertDateFormat(post.createdAt)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className='line-clamp-1 text-muted-foreground'>{post.content}</p>
      </CardContent>
      <CardFooter>
        <div className='flex items-center gap-2'>
          <FaRegComment className='size-4' />
          <span className='text-sm'>{post.commentCount}</span>
          <span className='text-sm'>댓글</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export function PostCardSkeleton() {
  return (
    <Card className='h-[220px]'>
      <CardHeader>
        <div className='mb-4 flex items-center justify-between'>
          <Skeleton className='h-7 w-3/4' />
          <div className='flex items-center gap-2'>
            <Skeleton className='h-4 w-4' />
            <Skeleton className='h-4 w-8' />
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Skeleton className='h-6 w-6 rounded-lg' />
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-24' />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className='h-5 w-full' />
      </CardContent>
      <CardFooter>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-4' />
          <Skeleton className='h-4 w-8' />
          <Skeleton className='h-4 w-8' />
        </div>
      </CardFooter>
    </Card>
  );
}

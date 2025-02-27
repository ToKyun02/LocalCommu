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

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{post.title}</h2>
          <div className='flex flex-col items-center gap-2'>
            <FaRegThumbsUp className='size-4' />
            <span className='text-sm'>{post.likeCount}</span>
          </div>
        </CardTitle>
        <div className='flex flex-col gap-2'>
          <Image
            src={post.author.image ?? emptyProfile}
            alt={`${post.author.name}님의 프로필 이미지`}
            width={24}
            height={24}
          />
          <span className='text-sm'>{post.author.name}</span>
          <span className='text-sm'>{post.createdAt}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>{post.content}</p>
      </CardContent>
      <CardFooter>
        <div className='flex flex-col items-center gap-1'>
          <FaRegComment className='size-4' />
          <span className='text-sm'>{post.commentCount}</span>
          <span className='text-sm'>댓글</span>
        </div>
      </CardFooter>
    </Card>
  );
}

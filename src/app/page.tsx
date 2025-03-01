import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-6'>
      <span className='text-lg font-bold text-red-600'> 홈페이지입니다.</span>

      <Link
        href='/post'
        className='rounded-2xl bg-gray-900 px-4 py-2 text-white'
      >
        게시글 보러가기
      </Link>
    </div>
  );
}

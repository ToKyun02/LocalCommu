import PostForm from '@/components/post/PostForm';
import PostList from '@/components/post/PostList';

export default function Post() {
  return (
    <>
      <header className='sticky left-0 right-0 top-0 z-10 bg-white'>
        <div className='container mx-auto flex h-full items-center justify-between p-4'>
          <h1 className='text-3xl font-bold'>게시판</h1>
          <PostForm />
        </div>
      </header>
      <div className='container mx-auto p-4'>
        <main>
          <PostList />
        </main>
      </div>
    </>
  );
}

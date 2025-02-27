import PostForm from '@/components/post/PostForm';
import PostList from '@/components/post/PostList';

export default function Post() {
  return (
    <div className='container mx-auto p-4'>
      <header className='container fixed left-0 right-0 top-0 mx-auto flex items-center justify-between bg-white p-4'>
        <h1 className='text-3xl font-bold'>게시판</h1>
        <PostForm />
      </header>
      <main className='mt-16'>
        <PostList />
      </main>
    </div>
  );
}

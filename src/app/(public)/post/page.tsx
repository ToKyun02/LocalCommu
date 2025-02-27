import PostForm from '@/components/post/PostForm';

export default function Post() {
  return (
    <div className='container mx-auto p-4'>
      <header className='sticky left-0 top-0 flex w-full items-center justify-between'>
        <h1>게시판</h1>
        <PostForm />
      </header>
      <main></main>
    </div>
  );
}

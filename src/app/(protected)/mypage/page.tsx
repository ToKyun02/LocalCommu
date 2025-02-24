import { auth, signOut } from '@/auth';

export default async function MyPage() {
  const session = await auth();

  return (
    <div>
      {session?.user?.name}
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button>로그아웃</button>
      </form>
    </div>
  );
}

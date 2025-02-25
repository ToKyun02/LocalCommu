import { auth, signOut } from '@/auth';

export default async function MyPage() {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}
      >
        <button>로그아웃</button>
      </form>
    </div>
  );
}

import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export function unauthorized() {
  return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
}

export function notFound() {
  return NextResponse.json(
    { error: '존재하지 않는 호출입니다.' },
    { status: 404 },
  );
}

export function badRequest(message = '잘못된 요청입니다.') {
  return NextResponse.json({ error: message }, { status: 400 });
}

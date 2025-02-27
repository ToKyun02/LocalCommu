import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function notFound() {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export function badRequest(message = 'Bad request') {
  return NextResponse.json({ error: message }, { status: 400 });
}

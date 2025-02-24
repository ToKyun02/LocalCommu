'use server';

import { z } from 'zod';
import { loginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import UserDao from '@/dao/user';

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) return { error: '유효하지 않은 필드입니다.' };

  const { email, password } = validatedFields.data;

  const existingUser = await UserDao.getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: '회원가입한 이력이 없습니다.' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: '로그인을 성공했습니다!' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: '로그인 정보를 올바르게 입력해주세요.' };
        default:
          return { error: '알 수 없는 오류가 발생했습니다.' };
      }
    }
    throw error;
  }
}

'use server';

import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { signupSchema } from '@/schemas';
import UserDao from '@/dao/user';

export async function signup(values: z.infer<typeof signupSchema>) {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) return { error: '유효하지 않은 필드입니다.' };

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.NEXT_PUBLIC_SOLT!),
  );

  const existingUser = await UserDao.getUserByEmail(email);

  if (existingUser) return { error: '이미 가입한 사용자입니다.' };

  const result = await UserDao.postUser(name, email, hashedPassword);

  return result;
}

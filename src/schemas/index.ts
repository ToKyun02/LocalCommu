import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({
    message: '이메일 형식이 아닙니다.',
  }),
  password: z.string().min(1, {
    message: '비밀번호를 입력해주세요.',
  }),
});

export const signupSchema = z.object({
  email: z.string().email({
    message: '이메일 형식이 아닙니다.',
  }),
  name: z
    .string()
    .min(2, {
      message: '이름은 2글자 이상 입력해주세요.',
    })
    .max(10, {
      message: '이름은 10글자 이하로 입력해주세요.',
    }),
  password: z.string().min(8, {
    message: '비밀번호는 8글자 이상 입력해주세요.',
  }),
});

export const postCreateSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다.'),
  content: z.string().min(1, '내용은 필수입니다.'),
});

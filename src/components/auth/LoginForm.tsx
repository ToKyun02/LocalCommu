'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { loginSchema } from '@/schemas';
import { useForm } from 'react-hook-form';

import CardWrapper from '@/components/auth/CardWrapper';
import {
  //
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormSuccess, FormError } from '@/components/auth/formStatus';
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';

import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? '다른 소셜 계정에서 사용된 이메일입니다.'
      : '';

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (value: z.infer<typeof loginSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      login(value).then((data) => {
        setError(data?.error ?? '');
        setSuccess(data?.success ?? '');
      });
    });
  };

  return (
    <CardWrapper
      headerLabel='다시 만나서 반가워요!'
      backButtonLabel='계정이 없으신가요?'
      backButtonHref='/signup'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-gray-900'>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='이메일 입력'
                        type='email'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-gray-900'>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='비밀번호 입력'
                        type='password'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button className='w-full' disabled={isPending}>
            로그인
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

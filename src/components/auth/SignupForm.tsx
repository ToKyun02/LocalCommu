'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { signupSchema } from '@/schemas';
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
import { signup } from '@/actions/signup';
import { useState, useTransition } from 'react';
import { FormSuccess, FormError } from './formStatus';

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (value: z.infer<typeof signupSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      signup(value).then((data) => {
        setError(data.error ?? '');
        setSuccess(data.success ?? '');
      });
    });
  };

  return (
    <CardWrapper
      headerLabel='회원가입'
      backButtonLabel='이미 계정이 있나요?'
      backButtonHref='/auth/login'
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
              name='name'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='text-gray-900'>name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='이름 입력'
                        type='text'
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className='w-full' disabled={isPending}>
            회원가입
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

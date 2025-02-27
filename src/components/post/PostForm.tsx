'use client';

import z from 'zod';
import { postCreateSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CiCirclePlus } from 'react-icons/ci';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function PostForm() {
  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: '',
      content: '',
    },
    mode: 'onChange',
  });
  const onSubmit = (values: z.infer<typeof postCreateSchema>) => {
    // TODO: 리액트 쿼리 적용 후 변경할 로직입니다.
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CiCirclePlus className='size-4' />새 글 작성
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 글 작성</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-900'>제목</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='제목 입력' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-900'>내용</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='내용 입력'
                      className='h-40 resize-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full'>생성</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

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
import { useCreatePost } from '@/queries/posts';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getErrorMessage } from '@/lib/errorUtils';
import { useToastStore } from '@/stores/ToastStore';
import { useSubmitSpinnerStore } from '@/stores/SubmitSpinnerStore';

export default function PostForm() {
  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: '',
      content: '',
    },
    mode: 'onChange',
  });

  const { mutateAsync: createPost } = useCreatePost();

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { addToast } = useToastStore();
  const { setVisible } = useSubmitSpinnerStore();

  const onSubmit = async (values: z.infer<typeof postCreateSchema>) => {
    try {
      setVisible(true);
      await createPost(values);
      setOpen(false);
      form.reset();
      setVisible(false);
      addToast({
        message: '게시글이 성공적으로 생성되었습니다!',
        type: 'success',
      });
    } catch (error) {
      setOpen(false);
      form.reset();
      setVisible(false);
      addToast({
        message: getErrorMessage(error),
        type: 'error',
      });
      router.push('/login');
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <CiCirclePlus className='size-4' />새 글 작성
        </Button>
      </DialogTrigger>
      <DialogContent className='rounded-xl'>
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
                    <Input
                      {...field}
                      placeholder='제목 입력'
                      type='text'
                      disabled={form.formState.isSubmitting}
                    />
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
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' disabled={form.formState.isSubmitting}>
              생성
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

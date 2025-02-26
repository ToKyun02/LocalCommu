'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useKakao } from '@/context/KakaoContext';
import { placesSearchCB } from '@/lib/kakaoMap';

const searchKeywordSchema = z.object({
  keyword: z.string().min(1, {
    message: '키워드를 입력해주세요',
  }),
});

export default function SearchList() {
  const { kakao } = useKakao();

  const form = useForm<z.infer<typeof searchKeywordSchema>>({
    resolver: zodResolver(searchKeywordSchema),
    defaultValues: {
      keyword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (values: z.infer<typeof searchKeywordSchema>) => {
    if (kakao) {
      kakao.place.keywordSearch(
        values.keyword,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any, status: any, pagination: any) => {
          placesSearchCB(data, status, pagination, kakao);
        },
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='absolute left-4 top-4 z-10 flex flex-col gap-4 rounded-sm bg-white px-4 py-2 opacity-80'
      >
        <FormField
          control={form.control}
          name='keyword'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className='text-gray-900'>키워드</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='키워드 입력' type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button>검색</Button>
      </form>
      <div></div>
    </Form>
  );
}

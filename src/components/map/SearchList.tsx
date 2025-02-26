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
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';

const searchKeywordSchema = z.object({
  keyword: z.string().min(1, {
    message: '키워드를 입력해주세요',
  }),
});

interface Facility {
  id: string;
  address_name: string;
  place_name: string;
  place_url: string;
  phone: string;
}

export default function SearchList() {
  const { kakao } = useKakao();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [list, setList] = useState<any>();

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
          placesSearchCB(data, status, pagination, kakao, setList);
        },
      );
    }
  };

  const prevClick = () => {
    list?.pagination.prevPage();
  };

  const nextClick = () => {
    list?.pagination.nextPage();
  };

  return (
    <div className='absolute left-4 top-4 z-10 flex w-[300px] flex-col gap-4 rounded-sm bg-white px-4 py-2 opacity-80'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
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
      </Form>
      <div className='flex flex-col gap-3'>
        <div className='flex gap-2'>
          <Button onClick={prevClick} className='flex-1'>
            이전
          </Button>
          <Button onClick={nextClick} className='flex-1'>
            이후
          </Button>
        </div>
        <div className='flex h-[300px] flex-col gap-2 overflow-y-scroll'>
          {list?.data &&
            list.data.map((facility: Facility) => (
              <FacilityCard key={facility.id} data={facility} />
            ))}
        </div>
      </div>
    </div>
  );
}

function FacilityCard({ data }: { data: Facility }) {
  return (
    <a href={data.place_url} rel='noopenner noreferrer' target='_blank'>
      <Card>
        <CardHeader className='font-bold'>{data.place_name}</CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <p className='text-sm'>주소 : {data.address_name}</p>
          <p className='text-xs'>전화번호 : {data.phone}</p>
        </CardContent>
      </Card>
    </a>
  );
}

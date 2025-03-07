import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import QueryClientProvider from '@/queries/Provider';
import ToastContainer from '@/components/ui/Toast';
import SubmitSpinner from '@/components/ui/SubmitSpinner';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LocalCommu',
  description:
    'LocalCommu는 지역 사람들끼리 소통하고 정보를 공유하는 웹 애플리케이션입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${notoSansKr.variable} antialiased`}>
        <QueryClientProvider>
          {children}
          <ReactQueryDevtools />
          <ToastContainer />
          <SubmitSpinner />
        </QueryClientProvider>
      </body>
    </html>
  );
}

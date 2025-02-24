import CardWrapper from '@/components/auth/CardWrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel='이미 가입한 적 있는 이메일입니다.'
      backButtonHref='/auth/login'
      backButtonLabel='로그인 하러 가기'
    >
      <div className='flex w-full items-center justify-center'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrapper>
  );
}

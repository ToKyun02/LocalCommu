import LoginForm from '@/components/auth/LoginForm';
import { Suspense } from 'react';

export default function Login() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

'use client';

import { useSubmitSpinnerStore } from '@/stores/SubmitSpinnerStore';

export default function SubmitSpinner() {
  const { isVisible } = useSubmitSpinnerStore();

  if (!isVisible) return null;
  return (
    <div className='fixed inset-0 z-50 bg-gray-900 bg-opacity-20'>
      <div className='flex h-full items-center justify-center'>
        <div className='size-10 animate-spin rounded-full border-2 border-t-blue-600'></div>
      </div>
    </div>
  );
}

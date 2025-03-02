'use client';

import { cn } from '@/lib/utils';
import { useToastStore } from '@/stores/ToastStore';
import { AnimatePresence, motion } from 'motion/react';

export default function ToastContainer() {
  const { toastList, removeToast } = useToastStore();

  return (
    <div className='fixed bottom-5 left-4 z-10 flex flex-col gap-2'>
      <AnimatePresence>
        {toastList.map((toast, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.1 }}
            layout
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-white shadow-md',
              toast.type === 'info' && 'bg-gray-700',
              toast.type === 'success' && 'bg-green-500',
              toast.type === 'error' && 'bg-red-500',
            )}
            onClick={removeToast}
          >
            {toast.type === 'info' && 'ℹ️'}
            {toast.type === 'success' && '✅'}
            {toast.type === 'error' && '❌'}
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

import { motion } from 'framer-motion';
import React from 'react';

import { useModal } from '@/lib/store';

export default function Modal() {
  const { title, message, children } = useModal();

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-base-200/50'>
      <motion.div
        className='card max-h-[calc(100vh-5em)] w-[91.666667%] max-w-lg rounded-2xl bg-base-300 shadow-md'
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className='card-body'>
          <h2 className='card-title mb-4 text-2xl font-bold dark:text-primary-content'>
            {title}
          </h2>
          <div className='mt-2 mb-3'>{message}</div>
          {children && (
            <div className='card-actions mt-6 justify-end'>{children}</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

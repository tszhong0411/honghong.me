import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { FiClipboard } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { ChildrenType } from '@/lib/types';

const Pre = ({ children }: ChildrenType) => {
  const textInput = React.useRef(null);
  const { t } = useTranslation();

  return (
    <div className='relative'>
      <pre
        className='m-0 overflow-auto rounded-2xl p-0 py-2 text-left leading-6'
        ref={textInput}
      >
        {children}
      </pre>
      <button
        className='btn btn-outline btn-square btn-sm no-animation absolute top-2 right-2'
        aria-label='Copy Code'
        onClick={() => {
          navigator.clipboard.writeText(textInput.current.textContent);
          toast.success(t('common:copied'));
        }}
      >
        <FiClipboard size={15} />
      </button>
    </div>
  );
};

export default Pre;

import Giscus from '@giscus/react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React from 'react';

const Comment = () => {
  const { locale } = useRouter();
  const { theme, resolvedTheme } = useTheme();

  return (
    <div className='my-8'>
      <Giscus
        id='comment'
        repo='tszhong0411/honghong.me'
        repoId='R_kgDOGxHFnA'
        category='Blog Comments'
        categoryId='DIC_kwDOGxHFnM4CBGIQ'
        mapping='pathname'
        reactionsEnabled='1'
        emitMetadata='1'
        inputPosition='bottom'
        theme={theme === 'dark' || resolvedTheme === 'dark' ? 'dark' : 'light'}
        lang={locale}
        loading='eager'
      />
    </div>
  );
};

export default Comment;

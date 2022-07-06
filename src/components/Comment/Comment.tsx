import Giscus from '@giscus/react';
import { useMantineColorScheme } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

const Comment = () => {
  const { locale } = useRouter();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

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
        theme={dark ? 'dark' : 'light'}
        lang={locale}
        loading='eager'
      />
    </div>
  );
};

export default Comment;

import Giscus from '@giscus/react'
import { Box, useMantineColorScheme } from '@mantine/core'
import { useRouter } from 'next/router'
import React from 'react'

export default function Comment() {
  const { locale } = useRouter()
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Box my={32} id='comment'>
      <Giscus
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
    </Box>
  )
}

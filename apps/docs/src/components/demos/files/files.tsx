import { File, Files, Folder } from '@tszhong0411/ui'

const FilesDemo = () => {
  return (
    <Files className='w-full max-w-md'>
      <Folder name='app' defaultOpen>
        <File name='error.tsx' />
        <File name='layout.tsx' />
        <File name='not-found.tsx' />
        <File name='page.tsx' />
      </Folder>
      <File name='package.json' />
    </Files>
  )
}

export default FilesDemo

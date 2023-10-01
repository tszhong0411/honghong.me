import { render } from '@testing-library/react'

import Tree from '@/components/mdx/tree'
import { queryAllByAttr } from '@/tests/utils'

describe('<Tree />', () => {
  it('should render file and folder icons correctly', () => {
    const data = [
      {
        name: 'Folder 1',
        children: [
          {
            name: 'File 1.txt'
          },
          {
            name: 'File 2.txt'
          }
        ]
      },
      {
        name: 'Folder 2',
        children: [
          {
            name: 'File 3.txt'
          }
        ]
      }
    ]

    const { container } = render(<Tree data={data} />)
    const fileIconElements = queryAllByAttr('class')(
      container,
      'tabler-icon tabler-icon-file'
    )
    const folderIconElements = queryAllByAttr('class')(
      container,
      'tabler-icon tabler-icon-folder'
    )

    expect(fileIconElements.length).toBe(3)
    expect(folderIconElements.length).toBe(2)
  })
})

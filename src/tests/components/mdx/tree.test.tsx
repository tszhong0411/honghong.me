import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

  it('should be clickable if it is a folder', async () => {
    const data = [
      {
        name: 'Folder 1',
        children: [
          {
            name: 'File 1.txt'
          }
        ]
      }
    ]

    render(<Tree data={data} />)

    expect(screen.getByTestId('tree-node-folder')).toBeInTheDocument()

    // Children should be visible initially
    expect(screen.getByTestId('tree-node-children')).toBeInTheDocument()

    // Click on the folder
    await userEvent.click(screen.getByTestId('tree-node-folder'))

    // Children should be hidden after clicking on the folder
    expect(screen.queryByTestId('tree-node-children')).not.toBeInTheDocument()
  })
})

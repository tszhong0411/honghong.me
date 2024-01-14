import getHeadings from '@/utils/get-headings'

const content = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
`

describe('getHeadings()', () => {
  it('should return an array of headings', () => {
    const headings = getHeadings(content)

    expect(headings).toEqual([
      { id: 'heading-1', level: 1, title: 'Heading 1' },
      { id: 'heading-2', level: 2, title: 'Heading 2' },
      { id: 'heading-3', level: 3, title: 'Heading 3' },
      { id: 'heading-4', level: 4, title: 'Heading 4' },
      { id: 'heading-5', level: 5, title: 'Heading 5' },
      { id: 'heading-6', level: 6, title: 'Heading 6' }
    ])
  })
})

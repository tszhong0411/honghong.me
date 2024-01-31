import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'

describe('<Tabs />', () => {
  it('renders and displays the correct content when a tab is clicked', async () => {
    render(
      <Tabs defaultValue='foo'>
        <TabsList>
          <TabsTrigger value='foo' data-testid='foo-trigger'>
            foo
          </TabsTrigger>
          <TabsTrigger value='bar' data-testid='bar-trigger'>
            bar
          </TabsTrigger>
        </TabsList>
        <TabsContent value='foo'>foo content</TabsContent>
        <TabsContent value='bar'>bar content</TabsContent>
      </Tabs>
    )

    // bar is clicked
    await userEvent.click(screen.getByTestId('bar-trigger'))
    expect(screen.getByTestId('bar-trigger')).toHaveAttribute(
      'data-state',
      'active'
    )
    expect(screen.getByText('bar content')).toBeInTheDocument()

    // foo is clicked
    await userEvent.click(screen.getByTestId('foo-trigger'))
    expect(screen.getByTestId('foo-trigger')).toHaveAttribute(
      'data-state',
      'active'
    )
    expect(screen.getByText('foo content')).toBeInTheDocument()
  })
})

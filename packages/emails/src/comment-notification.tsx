import { Body } from '@react-email/body'
import { Button } from '@react-email/button'
import { Column } from '@react-email/column'
import { Container } from '@react-email/container'
import { Font } from '@react-email/font'
import { Head } from '@react-email/head'
import { Html } from '@react-email/html'
import { Img } from '@react-email/img'
import { Link } from '@react-email/link'
import { Markdown } from '@react-email/markdown'
import { Preview } from '@react-email/preview'
import { Row } from '@react-email/row'
import { Section } from '@react-email/section'
import { Tailwind } from '@react-email/tailwind'

type CommentNotificationProps = {
  title: string
  name: string
  commenterName: string
  comment: string
  commentUrl: string
  postUrl: string
  type: 'comment' | 'reply'
}

const CommentNotification = (props: CommentNotificationProps) => {
  const { title, name, commenterName, comment, commentUrl, postUrl, type } =
    props

  return (
    <Html lang='en-US'>
      <Head>
        <Font
          fontFamily='Inter'
          fallbackFontFamily='Arial'
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
            format: 'woff2'
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Preview>
        New {type === 'comment' ? 'comment' : 'reply'} on the post &quot;{title}
        &quot; on honghong.me
      </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                accent: '#0e0e10',
                border: '#e6e6e6'
              }
            }
          }
        }}
      >
        <Body className='mx-auto bg-white'>
          <Container className='border-border mx-auto my-10 max-w-3xl rounded-lg border border-solid p-[20px]'>
            <Section className='mb-14'>
              <Row>
                <Column align='justify'>
                  <Img
                    src='https://honghong.me/images/email/logo.png'
                    alt="Hong's logo"
                    height='50'
                  />
                </Column>
                <Column align='right' className='font-bold'>
                  honghong.me
                </Column>
              </Row>
            </Section>
            <h1 className='mb-6'>
              A new {type === 'comment' ? 'comment' : 'reply'}
            </h1>
            <Section className='text-zinc-700'>
              <h2 className='mb-3 text-lg font-normal'>
                Hi there, {type === 'comment' ? 'Hong' : name}
              </h2>
              <p className='mb-8 text-sm'>
                You have a new {type === 'comment' ? 'comment' : 'reply'} by{' '}
                <span className='font-bold'>{commenterName}</span> on the post{' '}
                <Link href={postUrl} className='font-bold'>
                  {title}
                </Link>
                :
              </p>
              <Markdown
                markdownCustomStyles={{
                  codeBlock: {
                    backgroundColor: '#f0f0f0',
                    padding: '12px',
                    border: '1px solid #e6e6e6',
                    borderRadius: '8px'
                  },
                  codeInline: {
                    backgroundColor: '#f0f0f0',
                    padding: '0.12em 0.25em',
                    borderRadius: '6px',
                    border: '1px solid #e6e6e6'
                  },
                  blockQuote: {
                    backgroundColor: 'transparent',
                    fontStyle: 'italic',
                    borderLeft: '4px solid #989898',
                    paddingLeft: '1em',
                    margin: '16px 0'
                  },
                  li: {
                    paddingLeft: '0.375em',
                    margin: '0.5em 0'
                  },
                  link: {
                    color: 'black'
                  },
                  table: {
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '14px',
                    lineHeight: '20px',
                    captionSide: 'bottom'
                  },
                  tr: {
                    borderBottom: '1px solid #e6e6e6'
                  },
                  td: {
                    verticalAlign: 'middle',
                    padding: '16px'
                  },
                  image: {
                    maxWidth: '100%',
                    height: 'auto'
                  },
                  hr: {
                    height: '1px',
                    backgroundColor: 'rgb(212 212 212)',
                    border: 'none'
                  }
                }}
                markdownContainerStyles={{
                  padding: '12px',
                  border: '1px solid #e6e6e6',
                  borderRadius: '8px',
                  maxWidth: '768px',
                  overflowWrap: 'break-word'
                }}
              >
                {comment}
              </Markdown>
            </Section>
            <Button
              href={commentUrl}
              className='border-border my-8 block w-full rounded-lg border border-solid bg-zinc-900 py-4 text-center text-white'
            >
              View comment on honghong.me
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

CommentNotification.PreviewProps = {
  title: 'Hello World',
  name: 'Hong',
  commenterName: 'John Doe',
  comment: `
Markdown test

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

> This is a blockquote

\`\`\`js
const test = 'Hello World'
\`\`\`

---

- List item 1
- List item 2

1. List item 1
2. List item 2

[Link](https://honghong.me)

![Image](https://honghong.me/images/avatar.png)

**Bold**

~~Strikethrough~~

*Italic*

\`Code\`

| Table | Table |
| ----- | ----- |
| Table | Table |
| Table | Table |
  `,
  commentUrl: 'http://localhost:3000/blog/hello-world#comment-1',
  postUrl: 'http://localhost:3000/blog/hello-world',
  type: 'reply'
}

export default CommentNotification

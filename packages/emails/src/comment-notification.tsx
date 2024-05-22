import { Body } from '@react-email/body'
import { Column } from '@react-email/column'
import { Container } from '@react-email/container'
import { Font } from '@react-email/font'
import { Head } from '@react-email/head'
import { Hr } from '@react-email/hr'
import { Html } from '@react-email/html'
import { Img } from '@react-email/img'
import { Link } from '@react-email/link'
import { Preview } from '@react-email/preview'
import { Row } from '@react-email/row'
import { Section } from '@react-email/section'
import { Tailwind } from '@react-email/tailwind'
import { Text } from '@react-email/text'
import { Fragment } from 'react'

type CommentNotificationProps = {
  comment: string
  commenter: {
    name: string
    image: string
  }
  date: string
  commentIdentifier: string
  post: {
    title: string
    url: string
  }
  type: 'comment' | 'reply'
}

const CommentNotification = (props: CommentNotificationProps) => {
  const { comment, commenter, date, commentIdentifier, post, type } = props

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
        New {type === 'comment' ? 'comment' : 'reply'} on the post &quot;
        {post.title}
        &quot; on honghong.me
      </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                accent: '#f0f0f0',
                border: '#242424'
              }
            }
          }
        }}
      >
        <Fragment>
          <Body className='mx-auto bg-black text-[#f0f0f0]'>
            <Container className='border-border mx-auto my-10 max-w-3xl rounded-lg border border-solid p-6'>
              <Section className='mb-8'>
                <Img
                  src='https://honghong.me/images/email/logo.png'
                  alt="Hong's logo"
                  width='50'
                  height='50'
                />
              </Section>
              <Section>
                <Text>
                  A new {type === 'comment' ? 'comment' : 'reply'} has been
                  posted on the post &quot;{post.title}&quot; on honghong.me
                </Text>
              </Section>
              <Hr className='border-border my-4' />
              <Section>
                <Row>
                  <Column className='w-8'>
                    <Img
                      src={commenter.image}
                      alt={commenter.name}
                      width='32'
                      height='32'
                      className='rounded-full'
                    />
                  </Column>
                  <Column className='pl-2 font-medium'>
                    <Text>
                      {commenter.name}
                      <span className='pl-3 text-[#999]'>{date}</span>
                    </Text>
                  </Column>
                </Row>
                <div dangerouslySetInnerHTML={{ __html: comment }} />
              </Section>
              <Hr className='border-border my-4' />
              <Section>
                <Link
                  href={`${post.url}#${commentIdentifier}`}
                  className='border-border my-8 block w-full rounded-lg border border-solid bg-zinc-900 py-4 text-center text-white'
                >
                  View {type === 'comment' ? 'comment' : 'reply'} on honghong.me
                </Link>
              </Section>
            </Container>
          </Body>
        </Fragment>
      </Tailwind>
    </Html>
  )
}

CommentNotification.PreviewProps = {
  comment: `
    <p>This is a rich comment</p>
    <p>This is <strong>bold</strong></p>
    <p></p>
    <p><em>This is italic</em></p>
    <p></p>
    <p><s>This is strike</s></p>
    <p></p>
    <p>
      <strong>
        <em>
          <s>This is everything!!
          </s>
        </em>
      </strong>
    </p>
  `,
  commenter: {
    name: 'John Doe',
    image: 'http://localhost:3000/api/avatar/john-doe'
  },
  date: '1970-01-01 00:00:00',
  commentIdentifier: 'comment-1',
  post: {
    title: 'Hello World',
    url: 'http://localhost:3000/blog/hello-world'
  },
  type: 'comment'
} satisfies CommentNotificationProps

export default CommentNotification

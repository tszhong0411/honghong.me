import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text
} from '@react-email/components'

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
  const year = new Date().getFullYear()

  const borderColor = '#e5e5e5'
  const mutedForeground = '#737373'
  const white = '#ffffff'

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
        New {type === 'comment' ? 'comment' : 'reply'} on the post &quot; {post.title} &quot; on
        honghong.me
      </Preview>
      <Body
        style={{
          margin: 'auto auto',
          backgroundColor: white,
          padding: '4px'
        }}
      >
        <Container
          style={{
            border: `1px solid ${borderColor}`,
            margin: '40px auto',
            maxWidth: '100%',
            width: '550px',
            borderRadius: '8px',
            padding: '24px'
          }}
        >
          <Section
            style={{
              marginBottom: '16px'
            }}
          >
            <Img
              src='https://honghong.me/images/avatar.png'
              alt="Hong's logo"
              width='50'
              height='50'
              style={{
                margin: '0 auto',
                borderRadius: '12px'
              }}
            />
          </Section>
          <Section>
            {type === 'comment' ? (
              <Text>
                A new comment has been posted on the post &quot;
                {post.title}&quot; on <Link href='https://honghong.me'>honghong.me</Link>
              </Text>
            ) : (
              <Text>
                {commenter.name} has replied to your comment on the post &quot;{post.title}&quot; on
                <Link href='https://honghong.me'>honghong.me</Link>
              </Text>
            )}
          </Section>
          <Hr
            style={{
              borderTop: `1px solid ${borderColor}`,
              margin: '16px 0'
            }}
          />
          <Section>
            <Row>
              <Column
                style={{
                  width: '32px'
                }}
              >
                <Img
                  src={commenter.image}
                  alt={commenter.name}
                  width='32'
                  height='32'
                  style={{
                    borderRadius: '50%'
                  }}
                />
              </Column>
              <Column
                style={{
                  paddingLeft: '12px',
                  fontWeight: '500'
                }}
              >
                <Text>
                  {commenter.name}
                  <span
                    style={{
                      paddingLeft: '12px',
                      color: mutedForeground
                    }}
                  >
                    {date}
                  </span>
                </Text>
              </Column>
            </Row>
            <pre
              style={{
                fontFamily: 'monospace',
                padding: '0 4px 8px 4px'
              }}
            >
              {comment}
            </pre>
          </Section>
          <Hr
            style={{
              borderTop: `1px solid ${borderColor}`,
              margin: '16px 0'
            }}
          />
          <Section>
            <Link
              href={`${post.url}?${commentIdentifier}`}
              style={{
                margin: '16px 0',
                display: 'block',
                width: '100%',
                borderRadius: '8px',
                backgroundColor: '#171717',
                padding: '16px 0',
                textAlign: 'center',
                color: white
              }}
            >
              View {type === 'comment' ? 'comment' : 'reply'} on honghong.me
            </Link>
          </Section>
          <Section>
            <Text
              style={{
                color: mutedForeground,
                marginBottom: '0px'
              }}
            >
              &copy; {year} Hong
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const markdown = `
This is a rich comment

This is **bold**

This is *italic*

This is ~~strike~~

\`\`\`js
console.log('Hello World')
\`\`\`

\`code\`

| Month    | Savings |
| -------- | ------- |
| January  | $250    |
| February | $80     |
| March    | $420    |
`

CommentNotification.PreviewProps = {
  comment: markdown,
  commenter: {
    name: 'John Doe',
    image: 'http://localhost:3000/api/avatar/john-doe'
  },
  date: '1970-01-01 00:00:00',
  commentIdentifier: 'comment=1',
  post: {
    title: 'Hello World',
    url: 'http://localhost:3000/blog/hello-world'
  },
  type: 'comment'
} satisfies CommentNotificationProps

export default CommentNotification

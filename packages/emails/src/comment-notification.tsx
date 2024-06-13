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
          margin: '0 auto',
          backgroundColor: '#000',
          color: '#f0f0f0'
        }}
      >
        <Container
          style={{
            border: '1px solid #242424',
            margin: '40px auto',
            maxWidth: '768px',
            borderRadius: '8px',
            padding: '24px'
          }}
        >
          <Section
            style={{
              marginBottom: '32px'
            }}
          >
            <Img
              src='https://honghong.me/images/email/logo.png'
              alt="Hong's logo"
              width='50'
              height='50'
            />
          </Section>
          <Section>
            <Text>
              A new {type === 'comment' ? 'comment' : 'reply'} has been posted on the post &quot;
              {post.title}&quot; on honghong.me
            </Text>
          </Section>
          <Hr
            style={{
              borderTop: '1px solid #242424',
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
                  paddingLeft: '8px',
                  fontWeight: '500'
                }}
              >
                <Text>
                  {commenter.name}
                  <span
                    style={{
                      paddingLeft: '12px',
                      color: '#999'
                    }}
                  >
                    {date}
                  </span>
                </Text>
              </Column>
            </Row>
            <div dangerouslySetInnerHTML={{ __html: comment }} />
          </Section>
          <Hr
            style={{
              borderTop: '1px solid #242424',
              margin: '16px 0'
            }}
          />
          <Section>
            <Link
              href={`${post.url}#${commentIdentifier}`}
              style={{
                border: '1px solid #242424',
                margin: '32px 0',
                display: 'block',
                width: '100%',
                borderRadius: '8px',
                backgroundColor: '#18181b',
                padding: '16px 0',
                textAlign: 'center',
                color: '#fff'
              }}
            >
              View {type === 'comment' ? 'comment' : 'reply'} on honghong.me
            </Link>
          </Section>
        </Container>
      </Body>
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

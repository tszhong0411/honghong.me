import Document, { Head, Html, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render() {
    return (
      <Html lang='zh-TW'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=Noto+Sans+TC:wght@500;700&family=Fira+Code:wght@300;400;500;600;700&family=Sora:wght@100;200;300;400;500;600;700;800&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

import Document, { Head, Html, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render() {
    return (
      <Html lang='zh-TW' className='scroll-smooth'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=JetBrains+Mono:wght@500;700&family=Noto+Sans+TC:wght@500;700&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body className='bg-body text-typeface-primary dark:bg-body-dark dark:text-typeface-primary-dark'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

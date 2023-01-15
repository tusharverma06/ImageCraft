import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property='og:image' content='https://icon-library.com/images/ai-icon/ai-icon-7.jpg' />
        <meta property="og:title" content="Image craft" key="title" />
        <meta
          property="og:description"
          content=" Turn me into any character in any universe with your own prompts"
          key="description"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

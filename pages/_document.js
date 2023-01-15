import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property='og:image' content='https://w7.pngwing.com/pngs/676/746/png-transparent-questionnaire-ico-icon-the-question-mark-and-pen-on-the-phone-pencil-text-rectangle.png' />
        <meta property="og:title" content="Image craft" key="title" />
        <meta
          property="og:description"
          content="build with buildspace"
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

import { AppProps } from 'next/app';
import Head from 'next/head';
import Background from '@/components/app/Background';
import Header from '@/components/header/Header';
import '@/styles.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:site_name" content="blog.ciffelia.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ciffelia" />
      </Head>
      <Background />
      <div className="flex flex-col font-serif">
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default MyApp;

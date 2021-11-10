import { AppProps } from 'next/app';
import Head from 'next/head';
import Background from '@/components/app/Background';
import Header from '@/components/app/header/Header';
import Footer from '@/components/app/footer/Footer';
import '@/styles.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <Background />
      <div className="flex flex-col font-serif">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
};

export default MyApp;

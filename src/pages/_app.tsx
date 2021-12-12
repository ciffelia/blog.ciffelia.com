import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import Background from '@/components/app/Background';
import Header from '@/components/app/header/Header';
import Footer from '@/components/app/footer/Footer';
import '@/styles.css';

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => (
  <>
    <DefaultSeo
      titleTemplate="%s | blog.ciffelia.com"
      defaultTitle="blog.ciffelia.com"
      openGraph={{
        locale: 'ja_JP',
        site_name: 'blog.ciffelia.com',
      }}
      twitter={{
        cardType: 'summary_large_image',
        site: '@ciffelia',
        handle: '@ciffelia',
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
        },
      ]}
    />
    <Background />
    <div className="flex flex-col font-serif">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  </>
);

export default MyApp;

import { type AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { SITE_DESCRIPTION, SITE_NAME } from '@/config';
import { buildCommonOpengraphImageUrl } from '@/features/opengraph';
import { Background } from '../components/background/Background';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <DefaultSeo
      titleTemplate={`%s | ${SITE_NAME}`}
      defaultTitle={SITE_NAME}
      description={SITE_DESCRIPTION}
      openGraph={{
        locale: 'ja_JP',
        siteName: SITE_NAME,
        type: 'website',
        images: [
          {
            url: buildCommonOpengraphImageUrl(),
          },
        ],
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
    <div className="min-h-screen flex flex-col font-serif">
      <Header />
      <Component {...pageProps} />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  </>
);

export default MyApp;

import { NextSeo } from 'next-seo';
import { SITE_URL_BASE } from '@/constants';

const HomeHead: React.FC = () => (
  <>
    <NextSeo
      description="Ciffeliaが技術の話などをするブログ"
      canonical={SITE_URL_BASE}
      openGraph={{
        type: 'website',
        images: [
          {
            url: 'https://og-image.ciffelia.com/**blog.ciffelia.com**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Ficon.ciffelia.com%2F%3Fformat%3Dpng%26size%3D512%26rounded%3Dtrue&widths=300&heights=300',
          },
        ],
      }}
    />
  </>
);

export default HomeHead;

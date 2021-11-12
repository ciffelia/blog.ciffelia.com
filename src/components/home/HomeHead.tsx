import MetaCommon from '@/components/common/meta/MetaCommon';
import MetaOgpBasic from '@/components/common/meta/ogp/MetaOgpBasic';
import MetaOgpWebsite from '@/components/common/meta/ogp/MetaOgpWebsite';
import MetaTwitterCard from '@/components/common/meta/MetaTwitterCard';

const HomeHead: React.FC = () => (
  <>
    <MetaCommon
      title="blog.ciffelia.com"
      description="Ciffeliaが技術の話などをするブログ"
      path="/"
    />

    <MetaOgpBasic
      title="blog.ciffelia.com"
      path="/"
      imageUrl="https://og-image.ciffelia.com/**blog.ciffelia.com**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Ficon.ciffelia.com%2F%3Fformat%3Dpng%26size%3D512%26rounded%3Dtrue&widths=300&heights=300"
      description="Ciffeliaが技術の話などをするブログ"
    />
    <MetaOgpWebsite />

    <MetaTwitterCard />
  </>
);

export default HomeHead;

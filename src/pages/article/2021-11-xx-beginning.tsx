import { parseISO } from 'date-fns';
import { ArticleMetadata } from '@/types/ArticleMetadata';
import ArticleHead from '@/components/article/ArticleHead';
import ArticleContainer from '@/components/article/ArticleContainer';
import ExternalLink from '@/components/common/ExternalLink';

export const metadata: ArticleMetadata = {
  slug: '2021-11-xx-beginning',
  title: 'ブログをつくった',
  description: 'ブログをつくりました。',
  tags: ['Web', 'Next.js', 'Vercel', 'TypeScript'],
  publishedAt: parseISO('2021-11-10T20:13:00+09:00'),
  modifiedAt: parseISO('2021-11-10T20:13:00+09:00'),
  ogpImageUrl:
    'https://og-image.ciffelia.com/**%E3%83%96%E3%83%AD%E3%82%B0%E3%82%92%E3%81%A4%E3%81%8F%E3%81%A3%E3%81%9F**.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Ficon.ciffelia.com%2F%3Fformat%3Dpng%26size%3D512%26rounded%3Dtrue&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg&images=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fremojansen%2Flogo.ts%40master%2Fts.svg&widths=350&heights=350',
};

const Article202111xxBeginning: React.VFC = () => {
  return (
    <>
      <ArticleHead metadata={metadata} />
      <ArticleContainer metadata={metadata}>
        <p>ブログをつくりました。</p>
        <p>
          リポジトリは
          <ExternalLink to="https://github.com/ciffelia/blog.ciffelia.com">
            こちら
          </ExternalLink>
          。
        </p>
      </ArticleContainer>
    </>
  );
};

export default Article202111xxBeginning;

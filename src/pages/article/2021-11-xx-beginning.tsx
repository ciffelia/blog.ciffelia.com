import { parseISO } from 'date-fns';
import { ArticleMetadata } from '@/features/article';
import { ArticleHead } from '@/features/article/components/ArticleHead';
import { ArticleContainer } from '@/features/article/components/ArticleContainer';
import { ExternalLink } from '@/components/ExternalLink';

export const metadata: ArticleMetadata = {
  slug: '2021-11-xx-beginning',
  title: 'ブログをつくった',
  description: 'ブログをつくりました。',
  tags: ['Web', 'Next.js', 'Vercel', 'TypeScript'],
  publishedAt: parseISO('2021-11-10T20:13:00+09:00'),
  modifiedAt: parseISO('2021-11-10T20:13:00+09:00'),
  thumbnail: {
    emoji: '📝',
  },
};

const Article202111xxBeginning: React.FC = () => (
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

export default Article202111xxBeginning;

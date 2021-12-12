import { NextSeo } from 'next-seo';
import { ArticleMetadata } from '@/types/ArticleMetadata';

export interface Props {
  metadata: ArticleMetadata;
}

const ArticleHead: React.VFC<Props> = ({
  metadata: {
    slug,
    title,
    description,
    tags,
    publishedAt,
    modifiedAt,
    ogpImageUrl,
  },
}) => (
  <>
    <NextSeo
      title={title}
      description={description}
      canonical={`https://blog.ciffelia.com/article/${slug}`}
      openGraph={{
        type: 'article',
        images: [
          {
            url: ogpImageUrl,
          },
        ],
        article: {
          publishedTime: publishedAt.toISOString(),
          modifiedTime: modifiedAt.toISOString(),
          authors: ['Ciffelia'],
          tags,
        },
      }}
    />
  </>
);

export default ArticleHead;

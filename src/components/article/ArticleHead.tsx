import Head from 'next/head';
import ArticleMetadata from '@/types/ArticleMetadata';
import MetaCommon from '@/components/meta/MetaCommon';
import MetaOgpBasic from '@/components/meta/ogp/MetaOgpBasic';
import MetaOgpArticle from '@/components/meta/ogp/MetaOgpArticle';
import MetaTwitterCard from '@/components/meta/MetaTwitterCard';

export interface Props {
  metadata: ArticleMetadata;
}

const ArticleHead: React.FC<Props> = ({
  metadata: {
    slug,
    title,
    description,
    tags,
    publishedAt,
    modifiedAt,
    ogpImageUrl,
  },
}) => {
  const pageTitle = `${title} - blog.ciffelia.com`;
  const path = `/article/${slug}`;

  return (
    <>
      <MetaCommon
        title={pageTitle}
        description={description}
        path={`/article/${slug}`}
        modifiedAt={modifiedAt}
        tags={tags}
      />

      <MetaOgpBasic
        title={pageTitle}
        path={path}
        imageUrl={ogpImageUrl}
        description={description}
      />
      <MetaOgpArticle
        publishedAt={publishedAt}
        modifiedAt={modifiedAt}
        tags={tags}
      />

      <MetaTwitterCard />
    </>
  );
};

export default ArticleHead;

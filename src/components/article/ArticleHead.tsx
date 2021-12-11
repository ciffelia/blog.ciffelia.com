import { ArticleMetadata } from '@/types/ArticleMetadata';
import MetaCommon from '@/components/common/meta/MetaCommon';
import MetaOgpBasic from '@/components/common/meta/ogp/MetaOgpBasic';
import MetaOgpArticle from '@/components/common/meta/ogp/MetaOgpArticle';
import MetaTwitterCard from '@/components/common/meta/MetaTwitterCard';

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

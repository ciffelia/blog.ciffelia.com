import Head from 'next/head';
import { jsonLdScriptProps } from 'react-schemaorg';
import { BlogPosting, BreadcrumbList } from 'schema-dts';
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
}) => {
  const canonicalUrl = `https://blog.ciffelia.com/article/${slug}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonicalUrl}
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

      <Head>
        <script
          {...jsonLdScriptProps<BreadcrumbList>({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: title,
                item: canonicalUrl,
              },
            ],
          })}
        />
        <script
          {...jsonLdScriptProps<BlogPosting>({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            datePublished: publishedAt.toISOString(),
            dateModified: modifiedAt.toISOString(),
            image: [ogpImageUrl],
          })}
        />
      </Head>
    </>
  );
};

export default ArticleHead;

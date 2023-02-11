import Head from 'next/head';
import { jsonLdScriptProps } from 'react-schemaorg';
import { BlogPosting, BreadcrumbList } from 'schema-dts';
import { NextSeo } from 'next-seo';
import { PRODUCTION_SITE_URL_BASE } from '@/config';
import { ArticleMetadata } from '@/features/article';
import { buildArticleOpengraphImageUrl } from '@/features/opengraph';

export interface ArticleHeadProps {
  metadata: ArticleMetadata;
}

export const ArticleHead: React.FC<ArticleHeadProps> = ({
  metadata: {
    id,
    title,
    description,
    tags,
    isPublished,
    publishedAt,
    modifiedAt,
    thumbnail,
  },
}) => {
  const canonicalUrl = `${PRODUCTION_SITE_URL_BASE}/article/${id}`;
  const ogImageUrl =
    'staticImageData' in thumbnail
      ? thumbnail.staticImageData.src
      : buildArticleOpengraphImageUrl(title);

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonicalUrl}
        noindex={!isPublished}
        openGraph={{
          type: 'article',
          images: [
            {
              url: ogImageUrl,
            },
          ],
          article: {
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
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
            datePublished: publishedAt,
            dateModified: modifiedAt,
            image: [ogImageUrl],
            author: {
              '@type': 'Person',
              name: 'Ciffelia',
              url: 'https://ciffelia.com',
            },
          })}
        />
      </Head>
    </>
  );
};

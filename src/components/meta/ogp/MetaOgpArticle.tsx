import Head from 'next/head';

export interface Props {
  publishedAt: Date;
  modifiedAt: Date;
  tags: string[];
}

const MetaOgpArticle: React.FC<Props> = ({ publishedAt, modifiedAt, tags }) => (
  <Head>
    <meta property="og:type" content="article" />
    <meta
      property="article:published_time"
      content={publishedAt.toISOString()}
    />
    <meta property="article:modified_time" content={modifiedAt.toISOString()} />
    <meta property="article:author" content="Ciffelia" />
    {tags.map((tag) => (
      <meta property="article:tag" content={tag} key={tag} />
    ))}
  </Head>
);

export default MetaOgpArticle;

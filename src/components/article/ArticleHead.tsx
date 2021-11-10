import Head from 'next/head';

export interface Props {
  title: string;
  ogpImageUrl: string;
}

const ArticleHead: React.FC<Props> = ({ title, ogpImageUrl }) => {
  const pageTitle = `${title} - blog.ciffelia.com`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta property="og:title" content={pageTitle} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://blog.ciffelia.com/" />
      <meta property="og:image" content={ogpImageUrl} />
    </Head>
  );
};

export default ArticleHead;

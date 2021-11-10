import Head from 'next/head';

export interface Props {
  title: string;
  path: string;
  imageUrl: string;
  description: string;
}

const MetaOgpBasic: React.FC<Props> = ({
  title,
  path,
  imageUrl,
  description,
}) => (
  <Head>
    <meta property="og:title" content={title} />
    <meta property="og:url" content={`https://blog.ciffelia.com${path}`} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:description" content={description} />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:site_name" content="blog.ciffelia.com" />
  </Head>
);

export default MetaOgpBasic;

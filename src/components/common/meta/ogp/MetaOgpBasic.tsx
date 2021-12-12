import Head from 'next/head';

export interface Props {
  title: string;
  path: string;
  imageUrl: string;
  description: string;
}

const MetaOgpBasic: React.VFC<Props> = ({
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
  </Head>
);

export default MetaOgpBasic;

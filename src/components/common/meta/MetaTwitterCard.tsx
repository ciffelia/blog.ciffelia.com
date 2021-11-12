import Head from 'next/head';

const MetaTwitterCard: React.FC = () => (
  <Head>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ciffelia" />
    <meta name="twitter:creator" content="@ciffelia" />
    {/* 他のデータはOGPで指定すればよい */}
  </Head>
);

export default MetaTwitterCard;

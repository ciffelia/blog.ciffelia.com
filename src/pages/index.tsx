import Head from 'next/head';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>blog.ciffelia.com</title>
        <meta name="description" content="Ciffeliaが技術の話などをするブログ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello world! こんにちは世界！</h1>
    </div>
  );
};

export default Home;

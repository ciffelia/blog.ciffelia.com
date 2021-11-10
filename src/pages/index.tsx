import Head from 'next/head';
import Container from '@/components/Container';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>blog.ciffelia.com</title>
        <meta name="description" content="Ciffeliaが技術の話などをするブログ" />
        <meta property="og:title" content="blog.ciffelia.com" />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://blog.ciffelia.com/" />
        <meta
          property="og:image"
          content="https://og-image.ciffelia.com/**blog.ciffelia.com**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Ficon.ciffelia.com%2F%3Fformat%3Dpng%26size%3D512%26rounded%3Dtrue&widths=300&heights=300"
        />
        <meta
          property="og:description"
          content="Ciffeliaが技術の話などをするブログ"
        />
      </Head>
      <Container>
        <main className="text-4xl">
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
          <p>hello world</p>
        </main>
      </Container>
    </>
  );
};

export default Home;

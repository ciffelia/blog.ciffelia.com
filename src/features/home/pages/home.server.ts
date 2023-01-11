import { GetStaticProps } from 'next';
import { getArticle, listArticleId } from '@/features/article';
import { HomePageProps } from './home';

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const ids = await listArticleId();
  const articleList = await Promise.all(
    ids.map(async (id) => (await getArticle(id)).metadata),
  );

  return {
    props: { articleList },
  };
};

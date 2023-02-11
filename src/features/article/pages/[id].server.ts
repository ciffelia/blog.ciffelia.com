import { type GetStaticPaths, type GetStaticProps } from 'next';
import { getArticle, listArticleId } from '../utils/loadArticles';
import { type ArticlePageProps } from './[id]';

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await listArticleId();
  return {
    paths: ids.map((x) => ({
      params: { id: x },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({
  params,
}) => {
  if (params === undefined) {
    throw new Error('params is not defined.');
  }
  if (typeof params.id !== 'string') {
    throw new Error(`Unknown id: ${JSON.stringify(params.id)}`);
  }

  const data = await getArticle(params.id);
  return {
    props: data,
  };
};

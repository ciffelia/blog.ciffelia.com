import { type GetStaticProps } from 'next';
import { getArticleMetadata, listArticleId } from '@/features/article';
import { type HomePageProps } from './home';

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const ids = await listArticleId();
  const articleList = await Promise.all(
    ids.map(async (id) => await getArticleMetadata(id)),
  );

  return {
    props: {
      articleList: articleList.filter((meta) => meta.isPublished),
    },
  };
};

import { ArticleMetadata } from '../types/ArticleMetadata';
import { ArticleHead } from '../components/ArticleHead';
import { ArticleContainer } from '../components/ArticleContainer';

export interface ArticlePageProps {
  metadata: ArticleMetadata;
  content: string;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  content,
  metadata,
}) => (
  <>
    <ArticleHead metadata={metadata} />
    <ArticleContainer metadata={metadata}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </ArticleContainer>
  </>
);

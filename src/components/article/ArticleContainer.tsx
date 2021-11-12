import React from 'react';
import { ArticleMetadata } from '@/types/ArticleMetadata';
import Container from '@/components/Container';
import ArticleTitle from '@/components/article/ArticleTitle';

export interface Props {
  metadata: ArticleMetadata;
  children: React.ReactNode;
}

const ArticleContainer: React.FC<Props> = ({ metadata, children }) => {
  return (
    <Container>
      <article className="flex flex-col gap-y-8">
        <ArticleTitle metadata={metadata} />
        <div className="prose prose-blue">{children}</div>
      </article>
    </Container>
  );
};

export default ArticleContainer;

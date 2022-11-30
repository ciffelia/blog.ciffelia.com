import React from 'react';
import { ArticleMetadata } from '@/types/ArticleMetadata';
import Container from '@/components/common/Container';
import ArticleHeader from '@/components/article/ArticleHeader';

export interface Props {
  metadata: ArticleMetadata;
  children: React.ReactNode;
}

const ArticleContainer: React.FC<Props> = ({ metadata, children }) => (
  <article className="flex flex-col gap-5">
    <Container>
      <ArticleHeader metadata={metadata} />
    </Container>
    <Container>
      <div className="prose prose-blue">{children}</div>
    </Container>
  </article>
);

export default ArticleContainer;

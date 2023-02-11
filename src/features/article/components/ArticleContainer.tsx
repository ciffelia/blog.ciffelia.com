import React from 'react';
import { Container } from '@/components/Container';
import { type ArticleMetadata } from '../types/ArticleMetadata';
import { ArticleHeader } from '../components/ArticleHeader';

export interface ArticleContainerProps {
  metadata: ArticleMetadata;
  children: React.ReactNode;
}

export const ArticleContainer: React.FC<ArticleContainerProps> = ({
  metadata,
  children,
}) => (
  <article className="flex flex-col gap-5">
    <Container>
      <ArticleHeader metadata={metadata} />
    </Container>
    <Container>
      <div className="prose prose-blue">{children}</div>
    </Container>
  </article>
);

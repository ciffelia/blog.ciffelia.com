import React from 'react';
import Container from '@/components/Container';

export interface Props {
  children: React.ReactNode;
}

const ArticleContainer: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <article className="prose prose-blue">{children}</article>
    </Container>
  );
};

export default ArticleContainer;

import React from 'react';
import type { Root as HastRoot } from 'hast';
import { type ArticleMetadata } from '../types/ArticleMetadata';
import { ArticleHead } from '../components/ArticleHead';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleContent } from '../components/ArticleContent';

export interface ArticlePageProps {
  tree: HastRoot;
  metadata: ArticleMetadata;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ tree, metadata }) => (
  <>
    <ArticleHead metadata={metadata} />
    <ArticleContainer metadata={metadata}>
      <ArticleContent tree={tree} />
    </ArticleContainer>
  </>
);

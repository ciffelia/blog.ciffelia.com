import React from 'react';
import Script from 'next/script';
import type { Root as HastRoot } from 'hast';
import { ArticleMetadata } from '../types/ArticleMetadata';
import { ArticleHead } from '../components/ArticleHead';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleContent } from '../components/ArticleContent';
import { twitterWidgetScriptUrl } from '../components/Embed';

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
    <Script src={twitterWidgetScriptUrl} strategy="lazyOnload" />
  </>
);

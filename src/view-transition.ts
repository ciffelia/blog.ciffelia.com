export type ViewTransitionStyles = {
  "--vt-name": string;
  "--vt-class": string;
};

export const vtArticleCard = (articleId: string): ViewTransitionStyles => {
  return {
    "--vt-name": `article-card-${articleId}`,
    "--vt-class": "article-card",
  };
};

export const vtArticleCardInner = (articleId: string): ViewTransitionStyles => {
  return {
    "--vt-name": `article-card-inner-${articleId}`,
    "--vt-class": "article-card-inner",
  };
};

export const vtArticleCardTitle = (articleId: string): ViewTransitionStyles => {
  return {
    "--vt-name": `article-card-title-${articleId}`,
    "--vt-class": "article-card-title",
  };
};

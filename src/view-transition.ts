export type ViewTransitionAttrs = {
  "data-vt-name": string;
  "data-vt-class": string;
};

export const vtArticleCard = (articleId: string): ViewTransitionAttrs => {
  return {
    "data-vt-name": `article-card-${articleId}`,
    "data-vt-class": "article-card",
  };
};

export const vtArticleCardInner = (articleId: string): ViewTransitionAttrs => {
  return {
    "data-vt-name": `article-card-inner-${articleId}`,
    "data-vt-class": "article-card-inner",
  };
};

export const vtArticleCardTitle = (articleId: string): ViewTransitionAttrs => {
  return {
    "data-vt-name": `article-card-title-${articleId}`,
    "data-vt-class": "article-card-title",
  };
};

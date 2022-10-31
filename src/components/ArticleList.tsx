import React from 'react';

import { useAppSelector } from '../hooks/hooks';

import { Article, ArticleStateType } from './Article';

type ArticleListPropsType = {
  articles: ArticleStateType[];
};

export const ArticleList = ({ articles }: ArticleListPropsType): any => {
  const { status } = useAppSelector(state => state.app);

  if (articles.length === 0) {
    return <div>No articles... yet</div>;
  }
  if (status === 'loading') {
    return <div>Loading articles...</div>;
  }

  return (
    <div>
      {articles.map(article => {
        return <Article key={article.title} {...article} />;
      })}
    </div>
  );
};

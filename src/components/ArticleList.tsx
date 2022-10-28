import React, { useEffect } from 'react';

import { useActions, useAppSelector } from '../hooks/hooks';
import { articlesActions } from '../store';
import { ReturnComponentType } from '../types';

import { Article } from './Article';

export const ArticleList = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const articles = useAppSelector(state => state.articles.articles);
  // const dispatch = useAppDispatch();
  const { fetchArticlesTC } = useActions(articlesActions);
  const { fetchAuthArticlesTC } = useActions(articlesActions);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAuthArticlesTC();
    } else {
      fetchArticlesTC();
    }
  }, [fetchArticlesTC, fetchAuthArticlesTC, isLoggedIn]);
  if (articles.length) {
    return (
      <div>
        {articles.map(article => {
          return <Article key={article.title} {...article} />;
        })}
      </div>
    );
  }

  return <div>No articles</div>;
};

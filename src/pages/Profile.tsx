import React, { useEffect, useState } from 'react';

import { ArticleList } from '../components/ArticleList';
import { Tab } from '../components/Tab';
import { UserInfo } from '../components/UserInfo';
import { useActions, useAppSelector } from '../hooks/hooks';
import { articlesActions } from '../store';
import { ReturnComponentType } from '../types';

import style from './Profile.module.scss';

export const Profile = (): ReturnComponentType => {
  const { fetchArticlesByAuthorTC, fetchFavoritedArticlesTC } =
    useActions(articlesActions);
  const [active, setActive] = useState<string>('My Articles');
  const { articles } = useAppSelector(state => state.articles);

  useEffect(() => {
    fetchArticlesByAuthorTC();
  }, [fetchArticlesByAuthorTC]);

  return (
    <div className={style.profilePage}>
      <UserInfo />
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.col}>
            <div className={style.feedToggle}>
              <Tab
                title="My Articles"
                onClickAction={fetchArticlesByAuthorTC}
                active={active}
                setActive={setActive}
              />
              <Tab
                title="Favorited Articles"
                onClickAction={fetchFavoritedArticlesTC}
                active={active}
                setActive={setActive}
              />
            </div>
            <ArticleList articles={articles} />
          </div>
        </div>
      </div>
    </div>
  );
};

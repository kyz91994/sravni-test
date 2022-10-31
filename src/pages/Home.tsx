import React, { useEffect, useState } from 'react';

import { ArticleList } from '../components/ArticleList';
import { Banner } from '../components/Banner';
import { SideBar } from '../components/SideBar';
import { Tab } from '../components/Tab';
import { useActions, useAppSelector } from '../hooks/hooks';
import { articlesActions } from '../store';
import { ReturnComponentType } from '../types';

import style from './Home.module.scss';

export const Home = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const { fetchAuthArticlesTC } = useActions(articlesActions);
  const { fetchArticlesTC } = useActions(articlesActions);
  const [active, setActive] = useState<string>('Your feed');
  const { articles } = useAppSelector(state => state.articles);

  useEffect(() => {
    if (isLoggedIn) {
      setActive('Your feed');
      fetchAuthArticlesTC();
    } else {
      setActive('Global feed');
      fetchArticlesTC();
    }
  }, [fetchArticlesTC, fetchAuthArticlesTC, isLoggedIn]);

  return (
    <div>
      {!isLoggedIn && <Banner page="mainPage" />}
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.colLeft}>
            <div className={style.feedToggle}>
              {isLoggedIn && (
                <Tab
                  title="Your feed"
                  onClickAction={fetchAuthArticlesTC}
                  active={active}
                  setActive={setActive}
                />
              )}
              <Tab
                title="Global feed"
                onClickAction={fetchArticlesTC}
                active={active}
                setActive={setActive}
              />
            </div>
            <ArticleList articles={articles} />
          </div>
          <div className={style.colRight}>
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

import { useActions, useAppSelector } from '../hooks/hooks';
import { articlesActions } from '../store';
import { ReturnComponentType } from '../types';

import style from './Feed.module.scss';
import { Tab } from './Tab';

export const Feed = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const { fetchAuthArticlesTC } = useActions(articlesActions);
  const { fetchArticlesTC } = useActions(articlesActions);
  const [active, setActive] = useState<string>('Your feed');

  return (
    <div className={style.feedToggle}>
      {isLoggedIn && (
        <Tab
          title="Your feed"
          fetchArticle={fetchAuthArticlesTC}
          active={active}
          setActive={setActive}
        />
      )}
      <Tab
        title="Global feed"
        fetchArticle={fetchArticlesTC}
        active={active}
        setActive={setActive}
      />
    </div>
  );
};

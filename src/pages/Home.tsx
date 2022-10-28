import React from 'react';

import { ArticleList } from '../components/ArticleList';
import { Banner } from '../components/Banner';
import { Feed } from '../components/Feed';
import { SideBar } from '../components/SideBar';
import { useAppDispatch } from '../hooks/hooks';
import { setIsLoggedIn } from '../store/auth-reducer';
import { ReturnComponentType } from '../types';

import style from './Home.module.scss';

export const Home = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Banner />
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.colLeft}>
            <Feed />
            <ArticleList />
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('jwtToken');
                dispatch(setIsLoggedIn({ value: false }));
              }}
            >
              Logout
            </button>
          </div>
          <div className={style.colRight}>
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

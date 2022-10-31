import React from 'react';

import { ReturnComponentType } from '../types';

import { ArticleStateType } from './Article';
import style from './ArticlePage.module.scss';

export interface ArticlePageType extends ArticleStateType {
  author: { username: string; bio: null; image: string; following: boolean };
}
export const ArticlePage = (): ReturnComponentType => {
  return (
    <div>
      {/* <Banner page="userPage" /> */}
      <div className={style.container}>
        <div className={style.row}>Article</div>
      </div>
    </div>
  );
};

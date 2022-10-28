import React from 'react';

import { ReturnComponentType } from '../types';

import style from './Banner.module.scss';

export const Banner = (): ReturnComponentType => {
  return (
    <div className={style.banner}>
      <div className={style.container} />
      <h1>conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  );
};

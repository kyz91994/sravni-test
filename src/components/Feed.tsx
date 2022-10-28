import React from 'react';

import { ReturnComponentType } from '../types';

import style from './Feed.module.scss';
import { Tab } from './Tab';

export const Feed = (): ReturnComponentType => {
  return (
    <div className={style.feedToggle}>
      <ul>
        <Tab title="Global feed" />
      </ul>
    </div>
  );
};

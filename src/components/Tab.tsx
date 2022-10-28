import React from 'react';

import { ReturnComponentType } from '../types';

import style from './Tab.module.scss';

export const Tab = ({ title }: any): ReturnComponentType => {
  return (
    <li className={style.navItem}>
      <a href="/" className={`${style.navLink} ${style.active}`}>
        {title}
      </a>
    </li>
  );
};

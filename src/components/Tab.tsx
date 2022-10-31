import React from 'react';

import { ReturnComponentType } from '../types';

import style from './Tab.module.scss';

export const Tab = ({
  title,
  onClickAction,
  active,
  setActive,
}: any): ReturnComponentType => {
  const tabHandler = (): void => {
    onClickAction();
    setActive(title);
  };

  return (
    <button
      type="button"
      className={`${style.navLink} ${active === title ? style.active : ''}`}
      onClick={tabHandler}
    >
      {title}
    </button>
  );
};

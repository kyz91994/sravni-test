import React from 'react';

import { Link } from 'react-router-dom';

import { useAppSelector } from '../hooks/hooks';
import { ReturnComponentType } from '../types';

import style from './Header.module.scss';

export const Header = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return (
    <div className={style.header}>
      <div className={style.container}>
        <Link to="/">Conduit</Link>
        <div className={style.navbarBlock}>
          <Link to="/">Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/editor">New Article</Link>
              <Link to="/settings">Settings</Link>
              <Link to="/user">User</Link>
            </>
          ) : (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';

import { Link } from 'react-router-dom';

import { useAppSelector } from '../hooks/hooks';
import { ReturnComponentType } from '../types';

import { ButtonForm } from './ButtonForm';
import style from './UserInfo.module.scss';

export const UserInfo = (): ReturnComponentType => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <div className={style.userInfo}>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.col}>
            <span className={style.avatar}>
              <img alt="avatar" src={user.image} />
            </span>
            <h4>{user.username}</h4>
            <p>{user.bio}</p>
            {user && (
              <Link to="/settings" className={style.userInfoBtn}>
                {' '}
                Edit Profile Settings
              </Link>
            )}
            {!user && <ButtonForm>Unfollow Peter Pen</ButtonForm>}
          </div>
        </div>
      </div>
    </div>
  );
};

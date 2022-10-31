import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useActions, useAppSelector } from '../hooks/hooks';
import { articlesActions } from '../store';
import { ReturnComponentType } from '../types';

import style from './Article.module.scss';

export type ArticleType = {
  author: { username: string; bio: null; image: string };
  description: string;
  favoritesCount: number;
  tagList: string[];
  title: string;
  updatedAt: string;
};
export interface ArticleStateType {
  author: { username: string; bio: null; image: string };
  description: string;
  favoritesCount: number;
  tagList: string[];
  title: string;
  updatedAt: string;
  // eslint-disable-next-line react/no-unused-prop-types
  body: string;
  // eslint-disable-next-line react/no-unused-prop-types
  createdAt: string;
  favorited: boolean;
  slug: string;
}

// type ArticlePropsType = {
//   article: ArticleType;
// };

export const Article = ({
  author,
  description,
  favoritesCount,
  tagList,
  title,
  updatedAt,
  slug,
  favorited,
}: ArticleStateType): ReturnComponentType => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const status = useAppSelector(state => state.app.status);
  const date = new Date(updatedAt);

  // Запрашиваем день недели вместе с длинным форматом даты
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // type OptionsType = typeof options;
  const newDate = new Intl.DateTimeFormat('en-US', options as any).format(date);
  const { toggleFavoriteArticleTC } = useActions(articlesActions);

  return (
    <div className={style.article}>
      <div className={style.header}>
        <div className={style.infoBlock}>
          <span className={style.avatar}>
            <img alt="avatar" src={author.image} />
          </span>
          <div className={style.info}>
            <p className={style.name}>{author.username}</p>
            <p className={style.date}>{newDate}</p>
          </div>
        </div>
        <button
          onClick={
            isLoggedIn
              ? () => {
                  toggleFavoriteArticleTC({ favorited, slug });
                }
              : () => {
                  navigate('/login');
                }
          }
          type="button"
          disabled={status === 'loading'}
          className={
            !favorited
              ? `${style.btn} ${style.btnOutlinePrimary} ${style.btnSm}`
              : `${style.btn} ${style.btnOutlinePrimary} ${style.btnSm} ${style.btnActive}`
          }
        >
          <svg
            className={style.icon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
          >
            <path
              d="M22.229 4.514c-2.547 0-4.85 1.334-5.919 3.414-1.07-2.079-3.401-3.414-5.948-3.414-3.981 0-9.319 3.209-6.888 11.963C6.251 25.034 16.31 30.065 16.31 30.063c0 .002 10.044-5.029 12.821-13.586 2.431-8.754-2.922-11.963-6.902-11.963z"
              fill="#5cb85c"
              className="fill-515151"
            />
          </svg>
          <span>{favoritesCount}</span>
        </button>
      </div>
      <Link to={`/articles/${slug}`}>
        <div className={style.body}>
          <h1>{title}</h1>
          <p>{description}</p>
          <span className={style.readMore}>Read more...</span>
          <ul className={style.tagList}>
            {tagList.map(tag => {
              return (
                <li className={style.tag} key={tag}>
                  {tag}
                </li>
              );
            })}
          </ul>
        </div>
      </Link>
    </div>
  );
};

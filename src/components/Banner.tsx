import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useActions, useAppSelector } from '../hooks/hooks';
import { articlesActions } from '../store';
import { ReturnComponentType } from '../types';

import style from './Banner.module.scss';

type BannerPropsType = {
  page: PageType;
  // article?: ArticlePageType;
};
type PageType = 'userPage' | 'mainPage';

export const Banner = ({ page }: BannerPropsType): ReturnComponentType => {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const { toggleFavoriteArticleTC } = useActions(articlesActions);
  const navigate = useNavigate();
  const { currentArticle: article } = useAppSelector(state => state.articles);

  return (
    <div className={style.banner}>
      <div className={style.container}>
        {page === 'mainPage' && (
          <>
            <h1>conduit</h1>
            <p>A place to share your knowledge.</p>
          </>
        )}
        {page === 'userPage' && (
          <>
            <h1>{article && article.title}</h1>
            <div className={style.infoBlock}>
              <span className={style.avatar}>
                <img alt="avatar" src={article && article.author.image} />
              </span>
              <div className={style.info}>
                <p className={style.name}>{article && article.author.username}</p>
                <p className={style.date}>
                  {article && new Date(article.updatedAt).toDateString()}
                </p>
              </div>
              <button className={style.followUserBtn} type="button">
                {article && article.author.following ? 'Unfollow' : 'Follow '}
                {article && article.author.username}
              </button>
              <button
                className={style.favoriteUserBtn}
                type="button"
                onClick={
                  isLoggedIn
                    ? () => {
                        toggleFavoriteArticleTC({
                          favorited: article && article.favorited,
                          slug: article && article.slug,
                        });
                      }
                    : () => {
                        navigate('/login');
                      }
                }
              >
                {article && article.favorited ? 'Favorite' : 'Unfavorite '} Article
                {article && article.favoritesCount}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

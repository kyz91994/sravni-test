import axios from 'axios';

import { ArticleTypeModel } from '../components/NewArticle';

// import { authHeader } from '../store/auth-helper';
//
// // if (token) {
// //   settings = {
// //     withCredentials: true,
// //     headers: {
// //       Authorization: `Token ${localStorage.getItem('jwtToken')}`,
// //       // 'Access-Control-Allow-Origin': '*',
// //       // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
// //     },
// //   };
// // }
export const authHeader = (): any => {
  const token = localStorage.getItem('jwtToken');

  if (token) {
    return { Authorization: `Token ${token}` };
  }

  return {};
};

const instance = axios.create({
  baseURL: 'https://api.realworld.io/api/',
});

instance.interceptors.request.use(config => {
  return {
    ...config,
    headers: authHeader(),
  };
});

// api
export const articlesApi = {
  getUser() {
    const promise = instance.get<any>('user');

    return promise;
  },
  getArticles() {
    const promise = instance.get<any>('articles?limit=10&offset=0');

    return promise;
  },
  getAuthArticles() {
    const promise = instance.get<any>('articles/feed?limit=10&offset=0');

    return promise;
  },
  getFavoritedArticles() {
    const promise = instance.get<any>('articles?favorited=Evgeniii&limit=5&offset=0');

    return promise;
  },
  getArticlesByAuthor() {
    const promise = instance.get<any>('articles?author=Evgeniii&limit=5&offset=0');

    return promise;
  },
  getCurrentArticle(slug: string) {
    const promise = instance.get<any>(`articles/${slug}`);

    return promise;
  },
  createArticle(data: ArticleTypeModel) {
    const promise = instance.post<any>('articles', data);

    return promise;
  },
  likeArticle(slug: string) {
    const promise = instance.post<any>(`articles/${slug}/favorite`);

    return promise;
  },
  deleteLikeArticle(slug: string) {
    const promise = instance.delete<any>(`articles/${slug}/favorite`);

    return promise;
  },
};

export const tagsApi = {
  getTags() {
    const promise = instance.get<any>('tags');

    return promise;
  },
};

export const authAPI = {
  current() {
    const promise = instance.get<any>('user');

    return promise;
  },
  login(data: any) {
    const promise = instance.post<any>('users/login', data);

    return promise;
  },
  register(data: any) {
    const promise = instance.post<any>('users', data);

    return promise;
  },

  save(user: any) {
    const promise = instance.put<any>('user', user);

    return promise;
  },
};

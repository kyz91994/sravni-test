import React from 'react';

import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { articlesActions } from '../store';
import { ReturnComponentType } from '../types';

import style from './NewArcticle.module.scss';

export type ArticleTypeModel = {
  article: {
    body: string;
    description: string;
    tagList?: string;
    title: string;
  };
};
// type FormValuesType = {
//   article: ArticleTypeModel;
// };
export const NewArticle = (): ReturnComponentType => {
  const { redirectUrl } = useAppSelector(state => state.articles);
  const initialValues: ArticleTypeModel = {
    article: {
      body: '',
      description: '',
      tagList: '',
      title: '',
    },
  };

  const dispatch = useAppDispatch();
  const formik = useFormik({
    validate: values => {
      if (!values.article.title) {
        return {
          title: 'Title is required',
        };
      }
      if (!values.article.body) {
        return {
          body: 'Body is required',
        };
      }
      if (!values.article.description) {
        return {
          description: 'Description is required',
        };
      }
    },
    initialValues,

    onSubmit: async (
      values: ArticleTypeModel,
      // formikHelpers: FormikHelpers<FormValuesType>,
    ) => {
      dispatch(articlesActions.createArticleTC(values));
    },
  });

  if (redirectUrl) {
    return <Navigate to={`/${redirectUrl}`} />;
  }

  return (
    <div className={style.settingsPage}>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.col}>
            <h1>Your settings</h1>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                autoComplete="off"
                {...formik.getFieldProps('article.title')}
              />
              <input
                type="text"
                placeholder="Body"
                autoComplete="off"
                {...formik.getFieldProps('article.body')}
              />
              <textarea
                placeholder="Description"
                autoComplete="off"
                rows={8}
                {...formik.getFieldProps('article.description')}
              />
              <input
                type="text"
                placeholder="Tags"
                autoComplete="off"
                {...formik.getFieldProps('article.tagList')}
              />
              <button
                className="btn btn-lg btn-primary pull-xs-right ng-binding"
                type="submit"
              >
                Create article
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

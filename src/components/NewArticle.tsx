import React from 'react';

import { useFormik } from 'formik';
// import { Navigate } from 'react-router-dom';

import { useAppDispatch } from '../hooks/hooks';
import { articlesActions } from '../store';
import { ReturnComponentType } from '../types';

import { ButtonForm } from './ButtonForm';
import { InputForm } from './InputForm';
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
  // const { redirectUrl } = useAppSelector(state => state.articles);
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

  // if (redirectUrl) {
  //   return <Navigate to={`/${redirectUrl}`} />;
  // }

  return (
    <div className={style.settingsPage}>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.col}>
            <h1>Your settings</h1>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <InputForm
                type="text"
                placeholder="Title"
                {...formik.getFieldProps('article.title')}
              />
              <InputForm
                type="text"
                placeholder="Body"
                {...formik.getFieldProps('article.body')}
              />
              <textarea
                placeholder="Description"
                autoComplete="off"
                rows={8}
                {...formik.getFieldProps('article.description')}
              />
              <InputForm
                type="text"
                placeholder="Tags"
                {...formik.getFieldProps('article.tagList')}
              />

              <ButtonForm type="submit">Create article</ButtonForm>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

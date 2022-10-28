import React from 'react';

import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { authActions } from '../store';
import { ReturnComponentType } from '../types';

import style from './Settings.module.scss';

type FormValuesType = {
  user: {
    image?: string;
    username?: string;
    bio?: string;
    email: string;
    password: string;
  };
};
export const Settings = (): ReturnComponentType => {
  const { user } = useAppSelector(state => state.auth);

  const { redirectPath } = useAppSelector(state => state.auth);
  const initialValues: FormValuesType = {
    user,
  };

  const dispatch = useAppDispatch();
  const formik = useFormik({
    validate: values => {
      if (!values.user.username) {
        return {
          username: 'Username is required',
        };
      }
      if (!values.user.email) {
        return {
          email: 'Email is required',
        };
      }
      if (!values.user.password) {
        return {
          password: 'Password is required',
        };
      }
    },
    initialValues,

    onSubmit: async (
      values: FormValuesType,
      // formikHelpers: FormikHelpers<FormValuesType>,
    ) => {
      dispatch(authActions.updateUser(values));
    },
  });

  if (redirectPath === '/') {
    return <Navigate to="/" />;
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
                placeholder="URL of profile picture"
                autoComplete="off"
                {...formik.getFieldProps('user.image')}
              />
              <input
                type="text"
                placeholder="Username"
                autoComplete="off"
                {...formik.getFieldProps('user.username')}
              />
              <textarea
                placeholder="Short bio about you"
                autoComplete="off"
                rows={8}
                {...formik.getFieldProps('user.bio')}
              />
              <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                {...formik.getFieldProps('user.email')}
              />
              <input
                type="password"
                placeholder="New password"
                autoComplete="off"
                {...formik.getFieldProps('user.password')}
              />
              <button
                className="btn btn-lg btn-primary pull-xs-right ng-binding"
                type="submit"
              >
                Update Settings
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

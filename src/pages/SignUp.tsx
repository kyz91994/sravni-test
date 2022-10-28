import React from 'react';

import { useFormik } from 'formik';
import { Link, Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { authActions } from '../store';

import style from './SignUp.module.scss';

type FormValuesType = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export const SignUp = (): any => {
  const isLoggedin = useAppSelector(state => state.auth.isLoggedIn);

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
    initialValues: {
      user: {
        username: '',
        email: '',
        password: '',
      },
    },
    onSubmit: async (
      values: FormValuesType,
      // formikHelpers: FormikHelpers<FormValuesType>,
    ) => {
      dispatch(authActions.register(values));
    },
  });

  if (isLoggedin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={style.authPage}>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.col}>
            <h1>Sign up</h1>
            <p>
              <Link to="/login">
                <span>Have an account?</span>
              </Link>
            </p>
            <div />
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                autoComplete="off"
                {...formik.getFieldProps('user.username')}
              />
              <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                {...formik.getFieldProps('user.email')}
              />
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                {...formik.getFieldProps('user.password')}
              />
              <button
                className="btn btn-lg btn-primary pull-xs-right ng-binding"
                type="submit"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

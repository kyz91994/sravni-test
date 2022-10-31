import React from 'react';

import { useFormik } from 'formik';
import { Link, Navigate } from 'react-router-dom';

import { ButtonForm } from '../components/ButtonForm';
import { InputForm } from '../components/InputForm';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { authActions } from '../store';
import { ReturnComponentType } from '../types';

import style from './SignIn.module.scss';

type FormValuesType = {
  user: {
    email: string;
    password: string;
  };
};

export const SignIn = (): ReturnComponentType => {
  const isLoggedin = useAppSelector(state => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();
  const formik = useFormik({
    validate: values => {
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
        email: '',
        password: '',
      },
    },
    onSubmit: async (
      values: FormValuesType,
      // formikHelpers: FormikHelpers<FormValuesType>,
    ) => {
      dispatch(authActions.login(values));
    },
  });

  if (isLoggedin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={style.loginPage}>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.col}>
            <h1>Sign in</h1>
            <p>
              <Link to="/register">
                <span>Need an account?</span>
              </Link>
            </p>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <InputForm {...formik.getFieldProps('user.email')} placeholder="Email" />
              <InputForm
                type="password"
                {...formik.getFieldProps('user.password')}
                placeholder="Password"
              />
              <ButtonForm type="submit">Sign in</ButtonForm>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

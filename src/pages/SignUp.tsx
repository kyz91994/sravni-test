import React from 'react';

import { useFormik } from 'formik';
import { Link, Navigate } from 'react-router-dom';

import { ButtonForm } from '../components/ButtonForm';
import { InputForm } from '../components/InputForm';
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
              <InputForm
                type="text"
                placeholder="Username"
                {...formik.getFieldProps('user.username')}
              />
              <InputForm
                type="email"
                placeholder="Email"
                {...formik.getFieldProps('user.email')}
              />
              <InputForm
                type="password"
                placeholder="Password"
                {...formik.getFieldProps('user.password')}
              />
              <ButtonForm type="submit">Sign up</ButtonForm>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

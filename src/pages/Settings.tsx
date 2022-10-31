import React from 'react';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { ButtonForm } from '../components/ButtonForm';
import { InputForm } from '../components/InputForm';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { authActions } from '../store';
import { setIsLoggedIn, UserType } from '../store/auth-reducer';
import { ReturnComponentType } from '../types';

import style from './Settings.module.scss';

type FormValuesType = {
  user: UserType;
};
export const Settings = (): ReturnComponentType => {
  const { user } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const initialValues: FormValuesType = {
    user: {
      image: user.image,
      username: user.username,
      bio: user.bio || '',
      email: user.email,
      password: user.password,
    },
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

  return (
    <div className={style.settingsPage}>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.col}>
            <h1>Your settings</h1>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <InputForm
                type="text"
                placeholder="URL of profile picture"
                {...formik.getFieldProps('user.image')}
              />
              <InputForm
                type="text"
                placeholder="Username"
                {...formik.getFieldProps('user.username')}
              />
              <textarea
                placeholder="Short bio about you"
                rows={8}
                {...formik.getFieldProps('user.bio')}
              />
              <InputForm
                type="email"
                placeholder="Email"
                {...formik.getFieldProps('user.email')}
              />
              <InputForm
                type="password"
                placeholder="New password"
                {...formik.getFieldProps('user.password')}
              />
              <ButtonForm type="submit">Update Settings</ButtonForm>
            </form>
            <hr
              style={{
                marginTop: '1rem',
                marginBottom: '1rem',
                border: '0',
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              }}
            />
            <ButtonForm
              onClick={() => {
                localStorage.removeItem('jwtToken');
                dispatch(setIsLoggedIn({ value: false }));
                navigate('/');
              }}
              logOutType
              type="button"
            >
              Or click here to logout.
            </ButtonForm>
          </div>
        </div>
      </div>
    </div>
  );
};

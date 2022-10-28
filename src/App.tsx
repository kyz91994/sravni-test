import React, { useCallback, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import style from './App.module.scss';
// import { appActions } from './CommonActions/App';
import { Header } from './components/Header';
import { NewArticle } from './components/NewArticle';
import { useActions, useAppDispatch, useAppSelector } from './hooks/hooks';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SingIn';
import { appActions } from './store';
import { currentUser, setIsLoggedIn } from './store/auth-reducer';
import { ReturnComponentType } from './types';
import './assets/reset.css';

export const App = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  // const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const { initializeApp } = useActions(appActions);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  const storageChange = useCallback(
    (storageEvent: StorageEvent): void => {
      if (storageEvent.key) {
        const token = localStorage.getItem('jwtToken');

        if (token) {
          currentUser();
        } else {
          dispatch(setIsLoggedIn({ value: false }));
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    window.addEventListener('storage', e => storageChange(e));

    return () => {
      window.removeEventListener('storage', e => storageChange(e));
    };
  }, [storageChange]);

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      dispatch(currentUser());
    }
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        loading...
      </div>
    );
  }

  return (
    <div className={style.app__wrapper}>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
          {/* <Route path="/editor/:slug" element={<Editor>} /> */}
          <Route path="/editor" element={<NewArticle />} />
          {/* <Route path="/article/:id" element={<Article>} /> */}
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/@:username/favorites" element={<ProfileFavorites>} /> */}
          {/* <Route path="/@:username" element={<Profile>} /> */}

          {/* <Route path="teams" element={<Teams />}> */}
          {/*  <Route path=":teamId" element={<Team />} /> */}
          {/*  <Route path="new" element={<NewTeamForm />} /> */}
          {/*  <Route index element={<LeagueStandings />} /> */}
          {/* </Route> */}
        </Routes>
      </div>
    </div>
  );
};

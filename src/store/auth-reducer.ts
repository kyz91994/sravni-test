import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI } from '../api/api';

import { SUCCESS_RESPONSE } from './articles-reducer';

export type LoginParamsType = {
  user: {
    email: string;
    password: string;
  };
};
export const currentUser = createAsyncThunk<any>('auth/current', async () => {
  try {
    const res = await authAPI.current();

    if (res.status === SUCCESS_RESPONSE) {
      localStorage.setItem('jwtToken', res.data.user.token);

      return res.data.user;
    }
  } catch (error) {
    throw new Error();
  }
});

export const login = createAsyncThunk<any, LoginParamsType>('auth/login', async param => {
  try {
    const res = await authAPI.login(param);

    if (res.status === SUCCESS_RESPONSE) {
      localStorage.setItem('jwtToken', res.data.user.token);

      return res.data.user;
    }
  } catch (error) {
    throw new Error();
  }
});
export const register = createAsyncThunk<any, LoginParamsType>(
  'auth/register',
  async param => {
    // thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
      const res = await authAPI.register(param);

      if (res.status === SUCCESS_RESPONSE) {
        localStorage.setItem('jwtToken', res.data.user.token);

        return res.data.user;
      }
    } catch (error) {
      throw new Error();
    }
  },
);
export const updateUser = createAsyncThunk<any, LoginParamsType>(
  'auth/update',
  async param => {
    try {
      const res = await authAPI.save(param);

      if (res.status === SUCCESS_RESPONSE) {
        return res.data.user;
      }
    } catch (error) {
      throw new Error();
    }
  },
);

export const asyncActions = {
  login,
  register,
  updateUser,
  currentUser,
};

export const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    },
    redirectPath: '',
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.redirectPath = '/';
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;

        // state.redirectPath = '/';
      });
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedIn } = slice.actions;

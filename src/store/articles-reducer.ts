import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { articlesApi } from '../api/api';
import { ArticleType } from '../components/Article';
import { ArticleTypeModel } from '../components/NewArticle';

export const SUCCESS_RESPONSE = 200;
const fetchArticlesTC = createAsyncThunk<
  { articles: ArticleType[] },
  undefined
  // ThunkError
>('articles/fetchArticles', async (): Promise<any> => {
  // thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await articlesApi.getArticles();

    // thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));

    return { articles: res.data.articles };
  } catch (error) {
    // return handleAsyncServerNetworkError(error, thunkAPI);
  }
});
const fetchAuthArticlesTC = createAsyncThunk<
  { articles: ArticleType[] },
  undefined
  // ThunkError
>('articles/fetchAuthArticles', async (): Promise<any> => {
  // thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await articlesApi.getAuthArticles();

    // thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));

    return { articles: res.data.articles };
  } catch (error) {
    // return handleAsyncServerNetworkError(error, thunkAPI);
  }
});
const createArticleTC = createAsyncThunk<
  any,
  ArticleTypeModel
  // ThunkError
>('articles/createArticle', async (param): Promise<any> => {
  // thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await articlesApi.createArticle(param);

    if (res.status === SUCCESS_RESPONSE) {
      return res.data.article;
    }
    // thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));
  } catch (error) {
    // return handleAsyncServerNetworkError(error, thunkAPI);
  }
});

export const asyncActions = {
  fetchArticlesTC,
  fetchAuthArticlesTC,
  createArticleTC,
};

export const slice = createSlice({
  name: 'articles',
  initialState: {
    articles: [] as ArticleType[],
    redirectUrl: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchArticlesTC.fulfilled, (state, action) => {
      state.articles = action.payload.articles;
    });
    builder.addCase(fetchAuthArticlesTC.fulfilled, (state, action) => {
      state.articles = action.payload.articles;
    });
    builder.addCase(createArticleTC.fulfilled, (state, action) => {
      state.redirectUrl = action.payload.slug;
    });
  },
});

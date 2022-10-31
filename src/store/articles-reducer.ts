import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { articlesApi } from '../api/api';
import { appActions } from '../CommonActions/App';
import { ArticleStateType } from '../components/Article';
import { ArticlePageType } from '../components/ArticlePage';
import { ArticleTypeModel } from '../components/NewArticle';

const { setAppStatus } = appActions;

export const SUCCESS_RESPONSE = 200;
const fetchArticlesTC = createAsyncThunk<
  { articles: ArticleStateType[] },
  undefined
  // ThunkError
>('articles/fetchArticles', async (state, thunkAPI): Promise<any> => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await articlesApi.getArticles();

    thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));

    return { articles: res.data.articles };
  } catch (error) {
    // return handleAsyncServerNetworkError(error, thunkAPI);
  }
});

const fetchAuthArticlesTC = createAsyncThunk<
  { articles: ArticleStateType[] },
  undefined
  // ThunkError
>('articles/fetchAuthArticles', async (state, thunkAPI): Promise<any> => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await articlesApi.getAuthArticles();

    thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));

    return { articles: res.data.articles };
  } catch (error) {
    // return handleAsyncServerNetworkError(error, thunkAPI);
  }
});

const fetchFavoritedArticlesTC = createAsyncThunk<
  { articles: ArticleStateType[] },
  undefined
  // ThunkError
>('articles/fetchFavoritedArticles', async (state, thunkAPI): Promise<any> => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await articlesApi.getFavoritedArticles();

    thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));

    return { articles: res.data.articles };
  } catch (error) {
    // return handleAsyncServerNetworkError(error, thunkAPI);
  }
});

const fetchArticlesByAuthorTC = createAsyncThunk<
  { articles: ArticleStateType[] },
  undefined
  // ThunkError
>('articles/fetchArticlesByAuthor', async (state, thunkAPI): Promise<any> => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await articlesApi.getArticlesByAuthor();

    thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));

    return { articles: res.data.articles };
  } catch (error) {
    // return handleAsyncServerNetworkError(error, thunkAPI);
  }
});

const fetchCurrentArticleTC = createAsyncThunk<
  any,
  string
  // ThunkError
>('articles/fetchCurrentArticle', async (slug, thunkAPI): Promise<any> => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await articlesApi.getCurrentArticle(slug);

    thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));

    return res.data;
  } catch (error) {
    // return handleAsyncServerNetworkError(error, thunkAPI);
  }
});

const createArticleTC = createAsyncThunk<
  any,
  ArticleTypeModel
  // ThunkError
>('articles/createArticle', async (param, thunkAPI): Promise<any> => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await articlesApi.createArticle(param);

    if (res.status === SUCCESS_RESPONSE) {
      return res.data.article;
    }
    thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));
  } catch (error) {
    throw new Error();
  }
});

const toggleFavoriteArticleTC = createAsyncThunk<
  any,
  { favorited: boolean; slug: string }
  // ThunkError
>('articles/likeArticle', async (param, thunkAPI): Promise<any> => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
  try {
    if (param.favorited) {
      const res = await articlesApi.deleteLikeArticle(param.slug);

      if (res.status === SUCCESS_RESPONSE) {
        thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));

        return res.data.article;
      }
    } else {
      const res = await articlesApi.likeArticle(param.slug);

      if (res.status === SUCCESS_RESPONSE) {
        thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));

        return res.data.article;
      }
    }
  } catch (error) {
    throw new Error();
  }
});

export const asyncActions = {
  fetchArticlesTC,
  fetchAuthArticlesTC,
  fetchArticlesByAuthorTC,
  fetchFavoritedArticlesTC,
  createArticleTC,
  toggleFavoriteArticleTC,
  fetchCurrentArticleTC,
};

export const slice = createSlice({
  name: 'articles',
  initialState: {
    articles: [] as ArticleStateType[],
    redirectUrl: '',
    currentArticle: {} as ArticlePageType,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchArticlesTC.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
      })
      .addCase(fetchAuthArticlesTC.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
      })
      .addCase(fetchArticlesByAuthorTC.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
      })
      .addCase(fetchFavoritedArticlesTC.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
      })
      .addCase(fetchCurrentArticleTC.fulfilled, (state, action) => {
        state.currentArticle = action.payload.article;
      })
      .addCase(createArticleTC.fulfilled, (state, action) => {
        state.redirectUrl = action.payload.slug;
      })
      .addCase(toggleFavoriteArticleTC.fulfilled, (state, action) => {
        const index = state.articles.findIndex(at => at.title === action.payload.title);

        state.articles[index].favorited = action.payload.favorited;
        state.articles[index].favoritesCount = action.payload.favoritesCount;
      });
  },
});

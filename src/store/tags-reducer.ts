import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { tagsApi } from '../api/api';
import { appActions } from '../CommonActions/App';

const { setAppStatus } = appActions;

const fetchTagsTC = createAsyncThunk<
  { tags: string[] },
  undefined
  // ThunkError
>('tags/fetchTags', async (param, thunkAPI): Promise<any> => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await tagsApi.getTags();

    thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));

    return { tags: res.data.tags };
  } catch (error) {
    // return handleAsyncServerNetworkError(error, thunkAPI);
  }
});

export const asyncActions = {
  fetchTagsTC,
};

export const slice = createSlice({
  name: 'tags',
  initialState: {
    tags: [] as string[],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTagsTC.fulfilled, (state, action) => {
      state.tags = action.payload.tags;
    });
  },
});

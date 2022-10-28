import {
  asyncActions as appAsyncActions,
  slice as appSlice,
} from './application-reducer';
import {
  asyncActions as articlesAsyncActions,
  slice as articlesSlice,
} from './articles-reducer';
import { asyncActions as authAsyncActions, slice as authSlice } from './auth-reducer';
import { asyncActions as tagsAsyncActions, slice as tagsSlice } from './tags-reducer';

const appActions = {
  ...appSlice.actions,
  ...appAsyncActions,
};

const articlesActions = {
  ...articlesAsyncActions,
  ...articlesSlice.actions,
};

const authActions = {
  ...authAsyncActions,
  ...authSlice.actions,
};
const tagsActions = {
  ...tagsAsyncActions,
  ...tagsSlice.actions,
};

const authReducer = authSlice.reducer;

export { authActions, authReducer };

const articlesReducer = articlesSlice.reducer;

export { articlesReducer, articlesActions };

const appReducer = appSlice.reducer;

export { appReducer, appActions };

const tagsReducer = tagsSlice.reducer;

export { tagsActions, tagsReducer };

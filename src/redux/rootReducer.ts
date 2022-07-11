import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import userReducer from './slices/user';

import fieldKrowdReducer from './slices/krowd_slices/field';
import RiskReducer from './slices/krowd_slices/riskType';
import projectReducer from './slices/krowd_slices/project';
import productReducer from './slices/product';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const projectPersistConfig = {
  key: 'project',
  storage,
  keyPrefix: 'redux-'
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  fieldKrowd: fieldKrowdReducer,
  riskKrowd: RiskReducer,
  project: persistReducer(projectPersistConfig, projectReducer),
  product: persistReducer(productPersistConfig, productReducer)
});

export { rootPersistConfig, rootReducer };

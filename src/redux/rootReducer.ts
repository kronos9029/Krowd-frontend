import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import userReducer from './slices/userKrowdrac';

import fieldKrowdReducer from './slices/krowd_slices/field';
import areaKrowdReducer from './slices/krowd_slices/area';
import RiskReducer from './slices/krowd_slices/riskType';
import TransactionReducer from './slices/krowd_slices/transaction';
import walletKrowdReducer from './slices/krowd_slices/wallet';
import projectReducer from './slices/krowd_slices/project';
import BusinessReducer from './slices/krowd_slices/business';
import ProjectStageReducer from './slices/krowd_slices/stage';
import userKrowdReducer from './slices/krowd_slices/user';
import user_InvestorStateKrowdReducer from './slices/krowd_slices/investor';
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
  userKrowd: userKrowdReducer,
  user_InvestorStateKrowd: user_InvestorStateKrowdReducer,
  fieldKrowd: fieldKrowdReducer,
  areaKrowd: areaKrowdReducer,
  walletKrowd: walletKrowdReducer,
  stage: ProjectStageReducer,
  business: BusinessReducer,
  riskKrowd: RiskReducer,
  transactionKrowd: TransactionReducer,
  project: persistReducer(projectPersistConfig, projectReducer),
  product: persistReducer(productPersistConfig, productReducer)
});

export { rootPersistConfig, rootReducer };

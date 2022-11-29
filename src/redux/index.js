import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';

import {getProductsReducer} from './reducers/getProductsReducer';
import {loginHandlerReducer} from './reducers/loginHandler';

const store = configureStore({
  reducer: combineReducers({getProductsReducer, loginHandlerReducer}),
  middleware: [thunk],
});

export default store;

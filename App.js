//#region import thu vien
import React from 'react';
import {} from 'react-native';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import productReducer from './store/reducer/product';
import ProductNavigator from './navigations/ProductNavigator';
import CartReducer from './store/reducer/cart';
import OrderReducer from './store/reducer/order';
import AuthReducer from './store/reducer/auth';
//#endregion

export default function App(){

  const rootReducer = combineReducers({
    products : productReducer,
    cart : CartReducer,
    order : OrderReducer,
    auth: AuthReducer,
  });

  const store = createStore(rootReducer,applyMiddleware(ReduxThunk));


  return (
    <Provider store={store}>
      <ProductNavigator></ProductNavigator>
    </Provider>
  );
};

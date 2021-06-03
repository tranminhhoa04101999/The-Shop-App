//#region import thu vien
import React from 'react';
import {} from 'react-native';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';

import productReducer from './store/reducer/product';
import ProductNavigator from './navigations/ProductNavigator';
import CartReducer from './store/reducer/cart';
//#endregion

export default function App(){

  const rootReducer = combineReducers({
    products : productReducer,
    cart : CartReducer,
  });

  const store = createStore(rootReducer);


  return (
    <Provider store={store}>
      <ProductNavigator></ProductNavigator>
    </Provider>
  );
};

import React from 'react';

import {Provider} from 'react-redux';

import store from './src/redux';
import ProductsScreen from './src/screens/Products';
import LoginScreen from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './src/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

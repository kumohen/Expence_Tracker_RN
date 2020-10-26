
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux';
import DrawerNavigator from "./navigation/DrawerNavigator";
import * as firebase from "firebase";
import { firebaseConfig } from "./config";
import thunk from 'redux-thunk';
import rootReducer from "./redux/reducers";
import stripe from 'tipsi-stripe';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
Stripe.setOptionsAsync({
  publishableKey: 'pk_test_zKpriPTZuuvkW0Lmv32D4kIW00Hpmdac2h',
  androidPayMode: 'test'
});

const store = createStore(rootReducer,applyMiddleware(thunk));

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

 const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
    </Provider>
  );
}
export default App
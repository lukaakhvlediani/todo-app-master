import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./store";
import {ApolloProvider,ApolloClient,InMemoryCache } from "@apollo/client";

import "./index.css";
import App from "./App";
const client  = new ApolloClient({
  uri:'http://localhost:4001/graphql',
  cache:new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
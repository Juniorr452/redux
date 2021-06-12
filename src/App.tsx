import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';
import { store } from './store';
import Catalog from './components/Catalog';
import Cart from './components/Cart';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Redux Cart</h1>
        </header>

        <main className="App-main">
          <Catalog />

          <Cart />
        </main>
      </div>
    </Provider>
  );
}

export default App;

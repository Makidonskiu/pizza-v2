import React from 'react';
import { Header } from './components/Header.tsx';
import { Home, Cart, Error } from './pages/index';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

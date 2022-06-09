import React from 'react';
import { Header } from './components/index';
import { Home, Cart, Error } from './pages/index';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </SearchContext.Provider>
    </div>
  );
}

export default App;

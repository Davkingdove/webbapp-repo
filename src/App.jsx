// client/src/App.jsx
import React from 'react';
import SearchBar from './components/SearchBar';
import SearchData from './components/SearchData';
import Search from './components/Search';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Search App</h1>
      {/* <FilterData/>*/}
      {/* <SearchBar />  */}
      {/* <SearchData/> */}
      <Search/>
    </div>
  );
};

export default App;

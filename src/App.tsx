import React, { useState } from 'react';
import './styles/Styles.css'; 
import Header from './components/Header';
import CountryList from './components/CountryList';

const App: React.FC = () => {
  const [searchFilter, setSearchFilter] = useState('');

  const handleSearch = (searchTerm: string) => {
    setSearchFilter(searchTerm);
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <div className="container">
        <CountryList searchFilter={searchFilter} />
      </div>
    </div>
  );
};

export default App;

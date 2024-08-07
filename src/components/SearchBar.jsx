// client/src/components/SearchBar.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setResults(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setResults([]);
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name..."
      />
      <button onClick={handleSearch}>Search</button>

      <div className="results">
        {results.length > 0 ? (
          results.map((user) => (
            <div key={user.id} onClick={() => setSelectedUser(user)}>
              {user.first_name} {user.last_name}
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>

      {selectedUser && (
        <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default SearchBar;

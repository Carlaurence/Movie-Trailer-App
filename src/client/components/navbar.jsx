import React, { useState } from 'react';

function NavBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log('Buscando:', searchTerm);
  };

  return (
    <nav className='navbar'>
      <p className='the-movie-app-title'>The Movie Trailer App</p>
      <div className='search-container'>
        <input
        className='input-search'
          type='text'
          placeholder='Search for title'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <button className='admin-button'>Admin</button>
    </nav>
  );
}

export default NavBar;

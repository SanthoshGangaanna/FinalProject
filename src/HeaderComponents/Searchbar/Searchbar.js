import { TextField } from '@mui/material';
import React, { useState } from 'react';

const SearchBar = (props) => {
  const {setSearch =() => ''} = props || {}
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const { target = {} } = e || {}
    const { value = '' } = target || {}
    setSearch(value);
    setQuery(value);
    // setSearch(e.target.value)
    // setQuery(e.target.value)
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        type="search"
        placeholder="Search products..."
        value={query}
        onChange={(e) => handleSearch(e)}  
        size='small'
      />
    </div>
  );
};

export default SearchBar;

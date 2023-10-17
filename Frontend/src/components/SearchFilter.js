import React, { useState } from 'react';

function SearchFilter({ data, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = data
    ? data.filter((item) =>
        item.iNo && item.iNo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelect = (item) => {
    onSelect(item);
    // Clear the search term after selecting an item
    setSearchTerm('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm ? (
        <ul>
          {filteredData.map((item) => (
            <li key={item.id} onClick={() => handleSelect(item)}>
              {item.iNo}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default SearchFilter;

import React from "react";
import "./Search.scss";

function Search({wordToSearch, handleSearch, className}) {
  return (
    <form className={className} onSubmit={(e) => e.preventDefault()}>
      <label>
        <i className='fa fa-search'></i>
        <input
          aria-label='Search movies'
          autoComplete='off'
          type='text'
          name='search'
          placeholder='Search movies'
          value={wordToSearch}
          onChange={handleSearch}
        />
      </label>
    </form>
  )
}

export default Search
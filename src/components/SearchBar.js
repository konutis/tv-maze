import React, { useState } from 'react';
import { useHistory } from "react-router-dom"

export default function SearchBar (props) {
  const [inputValue, setInputValue] = useState('')

  const history = useHistory()

  function handleSearch() {
    history.push(`/search/${inputValue}`)
  }

  return (
    <form className='search-container' onSubmit={handleSearch}>
      <input
        placeholder='Search'
        className='search-input'
        type="text"
        value={inputValue}
        onChange={(e) => {setInputValue(e.target.value)}}
      />
      <button type='submit' className='search-button'>
        Search
      </button>
    </form>
  )
}
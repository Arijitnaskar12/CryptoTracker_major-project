import React from 'react';
import "./style.css";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
const SearchBar = ({search,setSearch}) => {
  return (
    <div className='searchBar'>
        <SearchRoundedIcon/>
        <input type='text' placeholder='Search' onChange={(e)=>setSearch(e.target.value)}/>
    </div>
  )
}

export default SearchBar;
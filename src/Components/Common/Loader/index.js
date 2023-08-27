import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import "./style.css";
const Loader = () => {
  return (
    <div className='LoaderClass'>
        <CircularProgress/>
    </div>
  )
}

export default Loader;
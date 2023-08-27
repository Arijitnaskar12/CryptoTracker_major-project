import React from 'react';
import "./style.css";

const Button = ({text,onClick,outlined}) => {
  return (
    <div className={outlined?"outLine-btn":"btn"} onClick={()=>onClick()}>{text}</div>
  )
}

export default Button;
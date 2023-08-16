import React from 'react';
import Amazon from "./Amazon.jpg"
import "./Logo.css";

function Logo() {
  return (
    <>
      <div className='image1'>
        <img src={Amazon} alt='logo' />
      </div>
    </>
  );
}

export default Logo;

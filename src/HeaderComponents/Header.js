import React from 'react';
import './Header.css';
// import Login from './Login/Login';
import Signup from './Signup/Signup';
import Menu from './Menu/Menu'
import Searchbar from './Searchbar/Searchbar'
import Cart from './Cart/Cart';
import Logo from './Logo/Logo'
import { Link } from 'react-router-dom';
import Login from './Authentication/Auth';

export default function Header(props) {
  const { setProducts = () => "", setSearch = () => '' } = props || {}
  
  // const handleOnSearch = (value) => {
  //   setSearch(value);
  // }

  // const searchBarProps = {setSearch: setSearch}
  return (
    <div className='HeaderContainer'>
      <div className='Split1'>
        <div className='logoContainer'><Link to="/"><Logo /></Link></div >
        <div className='Split1Comps'><Menu /></div>
      </div>
      <Searchbar setSearch={setSearch} />
      <div className='Split2' spacing={5}>
        <div className='Split2Comps'><Signup /></div>
        {/* <div className='Split2Comps'><Login/></div> */}
        <div className='Split2Comps'><Login/></div>
        <div className='Split2Comps'><Cart/></div>
      </div>
    </div>
  );
}

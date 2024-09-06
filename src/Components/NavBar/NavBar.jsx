import React, { useContext, useState } from 'react'

import './NavBar.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import  { AuthContext } from '../../store/Context';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

const NavBar = () => {
  const loginStyle = {color:'black'}
  const {user} = useContext(AuthContext) 
  const [search,setSearch] = useState(null)
  const navigate = useNavigate()
  const logout = ()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
    console.log(user?.displayName,'logget out');
    navigate('/login')
    }).catch((error) => {

    });
  }
  return (
    <div className="maindiv">
    <div className="navbar">
      <Link to={'/'}>
      <div className="olxlogo">
        <OlxLogo></OlxLogo>
      </div>
      </Link>
      <div className="placeSearch">
        <Search></Search>
        <input type="text"
        placeholder='Location' />
        <Arrow></Arrow>
      </div>
      <div className="productSearch">
        <div className="input">
          <input
            type="text"
            placeholder="Find car,mobile phone and more..."
          />
        </div>
        <div className="searchAction">
          <Search color="#ffffff"></Search>
        </div>
      </div>
      <div className="language">
        <span> ENGLISH </span>
        <Arrow></Arrow>
      </div>
      <div className="loginPage">
        <span style={{textTransform:'capitalize'}}>{ user? user.displayName:<Link to={'/login'} style={loginStyle}>LOGIN</Link> }</span>
        <hr />
      </div>
      <span onClick={logout} >{ user?"Logout": '' }</span>
      { user && <Link to={'/add'}>
      <div className="sellMenu">
        <SellButton></SellButton>
        <div className="sellMenuContent">
          <SellButtonPlus></SellButtonPlus>
          <span>SELL</span>
        </div>
      </div>
      </Link>}
      
    </div>
  </div>
  )
}

export default NavBar

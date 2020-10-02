import React from 'react';
import './header.css';

import logo from '../../assets/logo.png';

// import { Container } from './styles';

function Header() {
    return (
    <header id="main-header">
        <img src={logo} alt="Logo" className="img-fluid img-thumbnail" />
    </header>  
    );
  }
  
  export default Header;

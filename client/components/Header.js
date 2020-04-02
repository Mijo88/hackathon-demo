import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../assets/images';

function Header() {
  return (
    <header className="page-header">
      <Link to="/movies">
        <div className="logo-box">
          <img className="logo" src={logo} alt="TMDB logo" />
        </div>
      </Link>
    </header>
  );
}

export default Header;

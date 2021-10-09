import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <header className="page-header">
      <div className="page-header__wrapper">
        <div className="page-header__logo-wrapper">
          <Link className="page-header__logo" to="#">
            <img src={'image/logo.png'} alt="Rick and Morty logo" width="150" height="90"/>
          </Link>
        </div>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link main-nav__link--active" to="#">Main</Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="https://rickandmortyapi.com/">Used API</a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="https://rickandmortyapi.com/about">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

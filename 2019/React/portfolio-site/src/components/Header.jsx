import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Portfolio</h1>
    <NavLink to="/" activeClassName="is-active" exact>Home</NavLink><br />
    <NavLink to="/portfolio" activeClassName="is-active" exact>Portfolio</NavLink><br />
    <NavLink to="/contact" activeClassName="is-active" exact>Contact</NavLink><br />
  </header>
);

export default Header;

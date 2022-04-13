import React from 'react';
import Writing from './writing.js'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <Writing />
        <Bars />
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Filmy</NavLink>
          <NavLink to="/rooms">Sale</NavLink>
          <NavLink to="/showings">Seanse</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
export default Navbar;

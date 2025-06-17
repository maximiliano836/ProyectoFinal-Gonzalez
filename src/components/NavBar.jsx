import React from 'react';
import CartWidget from './CartWidget';
import '../style/NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='NavBar'>
      <Link to="/"><h1>TecnoStore</h1></Link>
      <Link to="/">Inicio</Link>
      <Link to="/catalogo">Catálogo</Link>
      <CartWidget />
    </nav>
  );
};

export default NavBar;

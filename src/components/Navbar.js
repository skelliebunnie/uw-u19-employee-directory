import React, { Component } from 'react';
import { Link, useLocation } from "react-router-dom";

function Navbar(props) {
  const location = useLocation();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">Employee Directory</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className={location.pathname === "/search" ? 'nav-link active': 'nav-link'}>Search</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom'
import '../App.css';

function NavBar(props) {


        return (
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <a className="nav-link text-light" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/tournament">Tournament</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
            </nav>
            {/* NEW - add a link to the home and profile pages */}
            {props.isAuthenticated && (
              <span>
                <Link to="/">Home</Link>&nbsp;
                <Link to="/profile">Profile</Link>
                <Link to="/tournament">Tournament</Link>
                <Link to="/about">About</Link>
              </span>
            )}
          </div>
  )
}
export default NavBar;

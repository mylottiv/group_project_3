import React from 'react';
import '../src/App.css';
import { Link } from 'react-router-dom';


function Nav() {

    const navStyle = {
        color: 'white'
    }
    return (
        <nav>
            <h3>logo</h3>
            <ul className="nav-links">
                <Link style={navStyle} to='/About'>
                    <il>About</il>
                </Link>
                <Link style={navStyle} to='/Tournament'>
                    <il>Tournament</il>
                </Link>
                <Link style={navStyle} to='/Profile'>
                    <il>Profile</il>
                </Link>
                <Link style={navStyle} to='/Login'>
                    <il>Login</il>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;

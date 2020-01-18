import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom'
import '../App.css';
import { useAuth0 } from "../react-auth0-spa";
import profile from "./pages/Profile"


const NavBar = (props) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();


  return (

  <div>
              <div>
                {isAuthenticated && (
                  <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                    <a className="nacbar-brand" href="#"></a>
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                    {/* <li className="nav-item active">
                      <a className="nav-link text-light" href="#">Home <span className="sr-only">(current)</span></a>
                    </li> */}
                    <li className="nav-item active">
                    <Link to={{
                      pathname: '/',
                      state: {
                        isAuthenticated: true
                      }
                    }}><a className="nav-link text-light" href="#">Home <span className="sr-only">(current)</span></a>
                    </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={{
                        pathname: '/profile',
                        state: {
                          isAuthenticated: true
                        }
                      }}><a className="nav-link" href="/profile">Profile</a></Link>
                        
                      
                    </li>

                    <li className="nav-item">
                      <Link to={{
                        pathname: '/tournament',
                        state: {
                          isAuthenticated: true
                        }
                      }}><a className="nav-link" href="/tournament">Tournament</a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <NavLink to={{
                        pathname: '/about',
                        state: {
                          isAuthenticated: true
                        }
                        
                      }}isActive={(match) =>{ 
                        if (!match) {
                          return false;
                        }}} ><a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">About</a></NavLink>
                      
                    </li>
                    
                  </ul>
                  <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                  </form>

                  <br></br>

                  {isAuthenticated&& <button className="btn btn-sm btn-success" onClick={() => logout()}>Log out</button>}
                    <br></br>
                  <Fragment>
                  <img className="profile" src={user.picture} alt="Profile" />
                  </Fragment>
                  </nav>
                )}
                {!isAuthenticated &&(
                  <button onClick={() => loginWithRedirect({})}>Log in</button>
                )}

                
                {isAuthenticated && (
                <span>
                  <Link to="/">Home</Link>&nbsp;
                  <Link to="/profile">Profile</Link>
                </span>
              )}
              
              </div>

              
            </div>
  );
};
    // <div>
    //   {!isAuthenticated && (
    //     <button onClick={() => loginWithRedirect({})}>Log in</button>
    //   )}

    //   {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

    //       {/* NEW - add a link to the home and profile pages */}
    //       {isAuthenticated && (
    //         <span>
    //           <Link to="/">Home</Link>&nbsp;
    //           <Link to="/profile">Profile</Link>
    //         </span>
    //       )}
    // </div>
  


export default NavBar;
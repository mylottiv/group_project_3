// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import './App.css';
// import Nav from './Nav';
// import About from './components/About';
// import Profile from './components/Profile';
// import Tournament from './components/Tournament';
// import Login from './components/Login';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Nav />
//         <Switch>
//           <Route path="/" exact component={HomePage} />
//           <Route path="/about" exact component={About} />
//           <Route path="/profile" exact component={Profile} />
//           <Route path="/tournament" exact component={Tournament} />
//           <Route path="/login" exact component={Login} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// const HomePage = () => (
//   <div>
//     <h1>Home Page!</h1>
//   </div>
// )


// export default App;

// src/App.js

// src/App.js

import React from "react";
import NavBar from "./components/NavBar";
import {Tournament, TourneyProvider, Bracket} from "./components";
// New - import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/pages/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import About from "./components/pages/About";


function App() {
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <Route path="/About" exact component={(props) => (<About />)} />
          {/* NEW - Modify the /profile route to use PrivateRoute instead of Route */}
          <PrivateRoute exact path="/profile" render={(props) => (<Profile />)} />
          <Route path="/tournament" component={(props) => (<Tournament {...props}/>)} />
          {/* <Route path='/tournament/:number' 
            render={(props) => {
              return (
              <div className='row' id='tournament-container'>
                <TourneyProvider {...props}>
                    <Bracket />
                </TourneyProvider>
              </div>
              )
            }}
          /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
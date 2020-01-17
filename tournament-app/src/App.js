import React from "react";
import NavBar from "./components/NavBar";
import {BracketDebug, TourneyProviderDebug} from './components/debug';
import {Game} from './components/game';
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
          <Route path="/tournament" render={(props) => {
            return (
            <>
              <div className='row'>
                <TourneyProviderDebug {...props}> 
                  <BracketDebug /> 
                </TourneyProviderDebug>
              </div>
              <div className='row'>
                <Game />
              </div>
            </>)}} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

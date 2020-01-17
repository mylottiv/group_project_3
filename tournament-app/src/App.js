import React from 'react';  
import {Bracket, TourneyProvider, DebugToolbar} from './components';
import {Switch, Route, Link} from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Card from './components/Card';


function App(props) {

  return (
    <div>
      <div>< Navbar/></div>
    <div className='container'>

 
         

      <div className='row'>
        <h3 className='btn-group-lg' role='group' aria-label='Basic example'>Choose Bracket Size (# of rounds):
          <a className='btn btn-outline-danger ml-1 mr-1' href="/1"><h4>1</h4></a>
          <a className='btn btn-outline-danger ml-1 mr-1' href="/2"><h4>2</h4></a>
          <a className='btn btn-outline-danger ml-1 mr-1' href="/3"><h4>3</h4></a>
          <a className='btn btn-outline-danger ml-1 mr-1' href="/4"><h4>4</h4></a>
          {/* <a className='btn btn-primary ml-1 mr-1' href="/5"><h4>5</h4></a> */}
          {/* <button type="button" class="btn btn-primary btn-xs">XSmall</button> */}
        </h3>
      </div>
      <value></value>
      <Switch>
        <Route path='/:number' 
          render={(props) => {
            return (
            <div className='row' id='tournament-container'>
              <TourneyProvider {...props}>
                  <Bracket />
              </TourneyProvider>
            </div>
            )
          }}
         />
      </Switch>
    </div>
    {/* <div className= "card-group">
      <h1>Top Sports</h1>
      <Card img="hk1.jpeg"/>
      <Card img="fb1.jpeg"/>
      <Card img="soc1.jpeg"/>
    </div> */}
    <div className= "container">
      <div className="row">
      <Card img="hk1.jpeg"/>
      <Card img="fb1.jpeg"/>
      <Card img="soc1.jpeg"/>
      <Card img="hk1.jpeg"/>
      <Card img="fb1.jpeg"/>
      <Card img="soc1.jpeg"/>
      <Card img="hk1.jpeg"/>
      <Card img="fb1.jpeg"/>
      </div>
    </div>
    </div>

<<<<<<< HEAD
  )
};


=======
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
>>>>>>> 580d5ae877946458a00ef96b92305494b639d877

export default App;

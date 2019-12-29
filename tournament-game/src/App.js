import React from 'react';  
import {Bracket, BracketProvider} from './components';
import {Switch, Route, Link} from 'react-router-dom';

function App(props) {

  return (
    <div className='container'>
      <div className='row'>
        <h3 className='btn-group-lg' role='group' aria-label='Basic example'>Choose Bracket Size (# of rounds):
          <a className='btn btn-primary ml-1 mr-1' href="/1"><h4>1</h4></a>
          <a className='btn btn-primary ml-1 mr-1' href="/2"><h4>2</h4></a>
          <a className='btn btn-primary ml-1 mr-1' href="/3"><h4>3</h4></a>
          <a className='btn btn-primary ml-1 mr-1' href="/4"><h4>4</h4></a>
          <a className='btn btn-primary ml-1 mr-1' href="/5"><h4>5</h4></a>
        </h3>
      </div>
      <Switch>
        <Route path='/:number' 
          render={(props) => {
            return (
              <div className='row' id='tournament-container'>
                <BracketProvider {...props}>
                  <Bracket />
                </BracketProvider>
              </div>
            )
          }}
        />
      </Switch>
    </div>
  )
};

export default App;

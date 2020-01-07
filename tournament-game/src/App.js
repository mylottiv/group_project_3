import React from 'react';  
import {Bracket, BracketProvider, DebugToolbar} from './components';
import {Switch, Route, Link} from 'react-router-dom';

function App(props) {

  return (
    <div className='container'>
      <DebugToolbar />
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

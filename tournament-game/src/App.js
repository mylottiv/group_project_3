import React from 'react';  
import {Bracket, TourneyProvider, DebugToolbar} from './components';
import {Switch, Route, Link} from 'react-router-dom';
import {Game} from './components/game';

function App(props) {

  return (
    <div className='container'>
      <DebugToolbar />
      <Switch>
        <Route exact path='/game' 
          render={(props) => {
            return (
              <div className='row' id='game-container'>
                <Game {...props} />
              </div>
            )
          }}
        />
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
  )
};

export default App;

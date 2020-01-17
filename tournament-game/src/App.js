import React from 'react';  
import {Bracket, TourneyProvider, DebugToolbar} from './components/tournament';
import {Switch, Route} from 'react-router-dom';
import {Game} from './components/game';
import {BracketDebug, TourneyProviderDebug} from './components/debug';

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
        <Route exact path='/gameBracket' 
          render={(props) => {
            return (
            <>
            <div className='row' id='tournament-container'>
              <TourneyProviderDebug {...props}>
                  <BracketDebug />
              </TourneyProviderDebug>
            </div>
            <div className='row' id='game-container'>
              <Game {...props}></Game>
            </div>
            </>
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

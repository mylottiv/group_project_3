import React from 'react';  
import {Bracket, TourneyProvider, DebugToolbar} from '../components';
import {Switch, Route, Link} from 'react-router-dom';

function Tournament(props) {

  return (
    <div className='container'>
      <DebugToolbar />
      {/* <Switch>
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
      </Switch> */}
    </div>
  )
};

export default Tournament;

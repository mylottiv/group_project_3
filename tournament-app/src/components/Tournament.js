import React from 'react';  
import {Bracket, TourneyProvider, DebugToolbar} from '../components';
import {Switch, Route, Link} from 'react-router-dom';

function Tournament(props) {

  console.log(props)
  return (
    <div className='container'>
      <DebugToolbar />
        <Route path={`${props.match.path}/:number`}
          render={(props) => {
            console.log('hit');
            return (
            <div className='row' id='tournament-container'>
              <TourneyProvider {...props}>
                  <Bracket />
              </TourneyProvider>
            </div>
            )
          }}
         />
    </div>
  )
};

export default Tournament;

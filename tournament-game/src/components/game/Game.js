import React from 'react';
import {Header, OppArea, PlayerArea, GameProvider, Results} from '../game'

function Game(props) {
    return (
        <GameProvider>
            <div className='col card'>
                <Header />
                <OppArea />
                <div className='dropdown-divider'/>
                <Results />        
                <div className='dropdown-divider'/>        
                <PlayerArea />
            </div>
        </GameProvider>
    )
}

export default Game;
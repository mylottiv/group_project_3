import React from 'react';
import {Header, OppArea, PlayerArea, GameProvider} from '../game'

function Game(props) {
    return (
        <GameProvider>
            <div className='col card'>
                <Header />
                <OppArea />
                <div className='dropdown-divider'/>        
                <PlayerArea />
            </div>
        </GameProvider>
    )
}

export default Game;
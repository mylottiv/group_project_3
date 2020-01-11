import React from 'react';
import {Header, OppArea, PlayerArea} from '../game'

function Game(props) {
    return (
        <div className='col'>
            <Header />
            <OppArea />        
            <PlayerArea />
        </div>
    )
}

export default Game;
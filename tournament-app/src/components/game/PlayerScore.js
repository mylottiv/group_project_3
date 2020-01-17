import React, {useContext} from 'react';
import { GameContext } from './GameContext';

function PlayerScore() {

    const score = useContext(GameContext).state.playerScore

    return (
        <div class='col'>
            <h5 className='text-center'>PlayerScore:</h5>
            <h4 className='text-center'>{score}</h4>
        </div>    
    )
}

export default PlayerScore;
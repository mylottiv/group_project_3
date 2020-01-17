import React, {useContext} from 'react';
import {GameContext} from '../game';

function OppScore() {

    const score = useContext(GameContext).state.oppScore;

    return (
        <div class='col'>
            <h5 className='text-center'>OppScore:</h5>
            <h4 className='text-center'>{score}</h4>
        </div>        
    )
}

export default OppScore;
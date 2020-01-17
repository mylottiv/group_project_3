import React, {useContext} from 'react';
import {GameContext} from '../game';

function OppChosen() {

    const chosen = useContext(GameContext).state.oppMove;

    return (
        <div class='col'>
            <h5 className='text-center'>Opp chosen:</h5>
            <h4 className='text-center'>{chosen}</h4>
        </div>    
    )
}

export default OppChosen;
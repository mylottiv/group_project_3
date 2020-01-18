import React, {useContext} from 'react';
import {GameContext} from '../game';

function PlayerChosen(props) {

    const chosen = useContext(GameContext).state.playerMove;

    return (
        <div class='col'>
            <h5 className='text-center'>Player Chosen:</h5>
            <h4 className='text-center'>{chosen}</h4>
        </div>
    )
}

export default PlayerChosen;
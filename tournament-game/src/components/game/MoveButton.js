import React, {useContext} from 'react';
import {GameContext} from '../game';

function MoveButton(props) {

    const {move} = props;
    const ctx = useContext(GameContext)
    const selectMove = () => ctx.dispatch({type: 'player_choose_move', payload: move});

    return (
        <div className='col'>
            <button className='btn-lg' onClick={selectMove}>{move}</button>
        </div>
    )
}

export default MoveButton;
import React, {useContext} from 'react';
import {GameContext} from '../game';

function MoveButton(props) {

    const {move} = props;
    const ctx = useContext(GameContext);
    const ready = ctx.state.ready;
    const roundWinner = ctx.state.roundWinner
    const selectMove = () => ctx.dispatch({type: 'player_choose_move', payload: move});

    return (
        <div className='col'>
            <button className='btn-lg' onClick={(ready || !roundWinner) ? selectMove : console.log('Cannot update move right now')}>{move}</button>
        </div>
    )
}

export default MoveButton;
import React, {useContext} from 'react';
import {GameContext} from '../game'

function Results() {

    const ctx = useContext(GameContext);
    const roundWinner = ctx.state.roundWinner;
    const matchWinner = ctx.state.matchWinner;
    const readyUp = () => ctx.dispatch({type: 'ready'});

    return (
        <div className='row'>
            <div className='col'>
                <div className='row'>
                    Winner: {roundWinner} Big Winner: {matchWinner}
                </div>
                <div className='row'>
                    <button className='btn-block' onClick={readyUp}>Ready?</button>
                </div>
            </div>
        </div>
    )
}

export default Results;
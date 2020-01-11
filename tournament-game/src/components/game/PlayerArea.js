import React from 'react';
import {MoveSelect, PlayerInfo, PlayerScore, PlayerChosen} from '../game';

function PlayerArea(props) {
    return (
        <div className='row'>
            <div className='col'>
                <div className='row'>
                    <PlayerInfo />
                </div>
                <div className='row'>
                    <PlayerScore />
                    <PlayerChosen />
                </div>
                <MoveSelect />
            </div>
        </div>
    )
}

export default PlayerArea;
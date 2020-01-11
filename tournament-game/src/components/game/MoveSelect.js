import React from 'react';
import {MoveButton} from '../game';

function MoveSelect(props) {
    return (
        <div className='row'>
            <MoveButton move='Rock' />
            <MoveButton move='Paper' />
            <MoveButton move='Scissors' />
        </div>
    )
}

export default MoveSelect;
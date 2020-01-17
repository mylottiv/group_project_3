import React from 'react';
import {MoveButton} from '../game';

function MoveSelect(props) {
    return (
        <div className='row card-body btn-group-lg text-center'>
            <MoveButton move='rock' />
            <MoveButton move='paper' />
            <MoveButton move='scissors' />
        </div>
    )
}

export default MoveSelect;
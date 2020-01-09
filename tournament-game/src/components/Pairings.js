import React from 'react';
import {Node} from './Node';

function Pairings(props) {
    const {stage} = props;

    const indexPointer = (2 * stage) - 1;

    const matchups = [];

    for (let i = indexPointer; i <= Math.pow(2, stage); i++) {
          
        matchups.push(<Node key={'node-' + i} index={i}/>)
      
    };

    return (
        <div className='row' id={'round-' + stage}>
            {matchups}
        </div>
    )
};

export default Pairings;
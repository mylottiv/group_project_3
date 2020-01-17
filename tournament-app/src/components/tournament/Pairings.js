import React from 'react';
import Node from '../Node';

function Pairings(props) {
    const {stage} = props;

    const indexPointer = Math.pow(2, stage) - 1;

    const matchups = [];

    console.log('indexPointer', indexPointer, Math.pow(2, stage));

    for (let i = indexPointer; i <= indexPointer * 2; i++) {
          
        matchups.push(<Node key={'node-' + i} index={i}/>)
      
    };

    return (
        <div className='row' id={'round-' + stage}>
            {matchups}
        </div>
    )
};

export default Pairings;
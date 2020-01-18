import React from 'react';
import NodeDebug from './NodeDebug';

function PairingsDebug(props) {
    const {stage} = props;

    const indexPointer = Math.pow(2, stage) - 1;

    const matchups = [];

    console.log('indexPointer', indexPointer, Math.pow(2, stage));

    for (let i = indexPointer; i <= indexPointer * 2; i++) {
          
        matchups.push(<NodeDebug key={'node-' + i} index={i}/>)
      
    };

    return (
        <div className='row' id={'round-' + stage}>
            {matchups}
        </div>
    )
};

export default PairingsDebug;
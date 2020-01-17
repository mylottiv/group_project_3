import React from 'react';
import Branch from '../tournament/Branch';
import PairingsDebug from './PairingsDebug';


// function Round(props) {

//     const {id, row} = props;

//     return (
//         <div className='row' id={id}>
//             {row}
//         </div>
//     )
// }

function RoundDebug(props) {
    const {stage} = props;
    
    return (
        <>
            <Branch stage={stage}/>
            <PairingsDebug stage={stage}/>   
        </>
    )
}

export default RoundDebug;
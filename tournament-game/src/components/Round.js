import React from 'react';
import Branch from './Branch';
import Pairings from './Pairings';


// function Round(props) {

//     const {id, row} = props;

//     return (
//         <div className='row' id={id}>
//             {row}
//         </div>
//     )
// }

function Round(props) {
    const {stage} = props;
    
    return (
        <>
            <Branch stage={stage}/>
            <Pairings stage={stage}/>
        </>
    )
}

export default Round;
import React, {useContext} from 'react';
import {BracketProvider} from './BracketContext';
import {TourneyContext} from './TourneyContext';
import Champion from './Champion';

// function Bracket(props) {

//         const tree = useContext(BracketContext);

//         return (
//             <div className='col' id='bracket'>
//                 {tree}
//             </div>
//         );

// }

function Bracket(props) {

    const size = useContext(TourneyContext)[0];

    const tree = [];

    tree.push(<Champion key='champion'/>);

    console.log('TREE');

    return (
        <div className='col' id='bracket'>
            <BracketProvider {...props} size={size}>
                {tree}
            </BracketProvider>
        </div>
    )

}

export default Bracket;
import React, {useContext} from 'react';
import {Round, BracketProvider, TourneyContext, Champion} from '../components';

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

    for (let i=1; i <= size; i++) {
        tree.push(<Round stage={i} />)
    }


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
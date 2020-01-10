import React, {useContext} from 'react';
import {BracketContext} from './BracketContext';
import Champion from './Champion';
import Round from './Round';

// function Bracket(props) {

//         const tree = useContext(BracketContext);

//         return (
//             <div className='col' id='bracket'>
//                 {tree}
//             </div>
//         );

// }

function Bracket(props) {

    const size = useContext(BracketContext).size;

    const tree = [];

    tree.push(<Champion key='champion'/>);

    console.log('TREE');

    for (let i = 1; i <= size; i++) {
        tree.push(<Round key={'round-' + i} stage={i} />);
        console.log('tree', tree);
    }

    return (
        <div className='col' id='bracket'>
            {tree}
        </div>
    )

}

export default Bracket;
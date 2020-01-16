import React, {useContext, useEffect} from 'react';
import {BracketContext} from './BracketContext';
import {TourneyContext} from './TourneyContext';

// function Node(props) {
//     const {content, index, parent, childNodes, sibling, selected, loser, primed} = props.payload;
//     const [leftChild, rightChild] = childNodes;
//     return (
//         <div
//             className={'col card text-center' + ((selected) ? ' bg-success' : '') + ((loser) ? ' bg-danger' : '')  + ((primed && (!selected && !loser)) ? ' bg-warning' : '')}
//             id={'node-' + index}
//             parent={'node-' + parent}
//             left-child={'node-' + leftChild}
//             right-child={'node-' + rightChild}
//             sibling={(sibling !== null) ? 'node-' + sibling : 'none'}
//         >
//             <button className='btn-light' onClick={() => props.selectNode(index, sibling, parent)} type='button'>{content}</button>
//         </div>
//     )
// }

function Node(props) {
    
    const {index} = props;

    const array = useContext(BracketContext).array;

    const selectNode = useContext(BracketContext).selectNode;

    const observerState = useContext(BracketContext).observed;

    console.log('TEST', array, selectNode);

    const {content, parent, childNodes, sibling, selected, loser, primed} = array[index];
    
    const [leftChild, rightChild] = childNodes;

    const selectedState = (selected ? ' bg-success' : '') + (loser ? ' bg-danger' : '')  + (
        (primed && (!selected && !loser)) ? ' bg-warning' : ''
    );

    useEffect(() => {
        if (observerState !== {}) {
            console.log('level 1', observerState);
            if (observerState.matchWinner = `player${index}`) {
                console.log('level 2');
                selectNode(index, sibling, parent);
            };
        };
    }, [observerState])
    
    return (
        <div
            className={'col card text-center' + selectedState}
            id={'node-' + index}
            parent={'node-' + parent}
            left-child={'node-' + leftChild}
            right-child={'node-' + rightChild}
            sibling={(sibling !== null) ? 'node-' + sibling : 'none'}
        >
            <button className='btn-light' onClick={() => selectNode(index, sibling, parent)} type='button'>{content}</button>
        </div>
    )

}

export default Node;
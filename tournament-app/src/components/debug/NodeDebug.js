import React, {useContext, useEffect} from 'react';
import { TourneyContextDebug } from './TourneyContextDebug';

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

function NodeDebug(props) {
    
    const {index} = props;

    const tournament = useContext(TourneyContextDebug);

    const currentNode = tournament.state.games ? tournament.state.games[index].nodeState : null;

    // const selectNode = useContext(TourneyContextDebug).selectNode;

    // const observerState = useContext(TourneyContextDebug).observed;

    let content;
    
    let selectedState = ''


    useEffect(() => {
    //     if (observerState !== {}) {
    //         console.log('level 1', observerState);
    //         if (observerState.matchWinner = `player${index}`) {
    //             console.log('level 2');
    //             selectNode(index, sibling, parent);
    //         };
    //     };
    // }, [observerState])
    if (currentNode !== null) {
            

        }
            
    }, [currentNode]);

    if (currentNode !== null) {
        
        const {selected, loser, primed} = currentNode;
            
        console.log(selected, loser, primed)
    
        selectedState = (selected ? ' bg-success' : '') + (loser ? ' bg-danger' : '')  + (
            (primed && (!selected && !loser)) ? ' bg-warning' : '');

        return (
            <div
                className={'col card text-center' + selectedState}
                id={'node-' + index}
            >
                    <h5>{currentNode.content}</h5>
            </div>
        )
    }  
    
    else {
        return (
            <div
                className={'col card text-center' + selectedState}
                id={'node-' + index}
            >
                    <h5>{index}</h5>
            </div>
            )
    };

}
export default NodeDebug;
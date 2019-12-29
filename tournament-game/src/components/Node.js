import React from 'react';

function Node(props) {
    const {content, index, parent, childNodes, sibling, selected, loser, primed} = props.payload;
    const [leftChild, rightChild] = childNodes;
    return (
        <div
            className={'col card text-center' + ((selected) ? ' bg-success' : '') + ((loser) ? ' bg-danger' : '')  + ((primed && (!selected && !loser)) ? ' bg-warning' : '')}
            id={'node-' + index}
            parent={'node-' + parent}
            left-child={'node-' + leftChild}
            right-child={'node-' + rightChild}
            sibling={(sibling !== null) ? 'node-' + sibling : 'none'}
        >
            <button className='btn-light' onClick={() => props.selectNode(index, sibling, parent)} type='button'>{content}</button>
        </div>
    )
}

export default Node;
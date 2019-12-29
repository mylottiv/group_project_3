import React from 'react';

function Node(props) {
    const {content, index, parent} = props.payload;
    return (
        <div className='col card text-center' id={'node-' + index} parent={'node-' + parent}>
            {content}
        </div>
    )
}

export default Node;
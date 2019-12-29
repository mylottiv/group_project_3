import React from 'react';

function Node(props) {
    return (
        <div className='col card text-center'>
            {props.content}
        </div>
    )
}

export default Node;
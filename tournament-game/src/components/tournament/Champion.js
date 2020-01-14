import React from 'react';
import Node from './Node';

function Champion(props) {

    return (
    <div className='row' id={'champion'}>
        <Node key='champion' index={0} />
    </div>
    )

}

export default Champion;
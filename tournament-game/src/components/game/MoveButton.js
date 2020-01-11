import React from 'react';

function MoveButton(props) {

    const {move} = props;

    return (
        <div className='col'>
            {move}
        </div>
    )
}

export default MoveButton;
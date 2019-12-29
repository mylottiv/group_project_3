import React from 'react';

function Round(props) {

    const {id, row} = props;

    return (
        <div className='row' id={id}>
            {row}
        </div>
    )
}

export default Round;
import React from 'react';

function Round(props) {
    return (
        <div className='row' style={(props.branches) ? {} : {}}>
            {props.row}{}
        </div>
    )
}

export default Round;
import React from 'react';

function Round(props) {

    const {round, row} = props;

    // If round is not even then this row is a row of branches
    const branch = round % 2 !== 0;

    // Initial row at round=0
    let id = '';
    
    if (round === 0) {

        id = 'round-' + round;

    }
    else {

        // Round ID depends upon whether or not a branch row
        if (branch) {
            id = 'branch-' + Math.floor(round/2);
        }
        else {
            id ='round-' + round/2;
        };

    };

    return (
        <div className='row' id={id} style={(round % 2 !== 0) ? {} : {}}>
            {row}
        </div>
    )
}

export default Round;
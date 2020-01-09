import React from 'react';

function Branch(props) {
    const {stage} = props;

    const branchImages = [];

    for (let i = 0; i <= Math.pow(2, (stage - 1)); i++) {
        
        branchImages.push(
            <div className='col text-center h-100'>
                <img className='w-50 h-100' src={'./branch.svg'} />
            </div>
        )

    }

    return (
        <div className='row' id={'branch-' + stage}>
            {branchImages}
        </div>
    );
}

export default Branch;
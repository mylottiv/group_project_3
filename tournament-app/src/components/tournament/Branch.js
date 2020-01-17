import React from 'react';

function Branch(props) {
    const {stage} = props;

    const branchImages = [];

    for (let i = 1; i <= Math.pow(2, (stage - 1)); i++) {
        console.log('stage', stage, Math.pow(2, (stage - 1)));
        branchImages.push(
            <div className='col text-center h-100' key={'Stage-' + stage + '-image-' + i}>
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
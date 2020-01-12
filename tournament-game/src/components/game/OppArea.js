import React from 'react';
import {OppInfo, OppScore, OppChosen} from '../game';

function OppArea(props) {
    return (
        <div className='row card-content'>
            <div className='col'>
                <div className='row'>
                    <OppInfo />
                </div>
                <div className='row'>
                    <OppScore />
                    <OppChosen />
                </div>
            </div>
        </div>
    )
}

export default OppArea;
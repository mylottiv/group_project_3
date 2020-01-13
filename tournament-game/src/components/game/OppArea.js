import React from 'react';
import {OppInfo, OppScore, OppChosen} from '../game';

function OppArea(props) {
    return (
        <div className='row card-body'>
            <div className='col'>
                <div className='row'>
                    <OppInfo />
                </div>
                <div className='row'>
                    <OppScore />
                    <OppChosen />
                    <div className='col' />
                </div>
            </div>
        </div>
    )
}

export default OppArea;
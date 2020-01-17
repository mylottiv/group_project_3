import React from 'react';
import {RoundInfo} from '../game';

function Header(props) {
    return (
        <div className='row card-header'>
            <RoundInfo />
        </div>
    )
}

export default Header;
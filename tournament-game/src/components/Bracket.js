import React, {useState, useContext} from 'react';
import {BracketContext} from './BracketContext';

function Bracket(props) {

        const tree = useContext(BracketContext);

        return (
            <div className='col' id='bracket'>
                {tree}
            </div>
        );

}

export default Bracket;
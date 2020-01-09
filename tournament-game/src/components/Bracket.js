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

/* 

function Bracket(props) {

    const size = useContext(BracketContext);

    const tree = [];

    tree.push(<Champion />);

    for (let i = 1; i <= size; i++) {
        tree.push(<Round stage={i}>);
    }

    return (
        <div className='col' id='bracket'>
            {tree}
        </div>
    )

}

*/

export default Bracket;
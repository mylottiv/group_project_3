import React, {useContext} from 'react';
import {TourneyContextDebug, ChampionDebug, RoundDebug} from '../debug';

function BracketDebug() {

    const size = useContext(TourneyContextDebug).state.depth || 1;

    console.log(size);
    
    const tree = [];

    console.log('TREE', tree);

    for (let i=1; i <= size; i++) {
        tree.push(<RoundDebug stage={i} />)
    }

    console.log('TREE', tree);

    return (
        <div className='col' id='bracket'>
            <ChampionDebug />
            {tree}
        </div>
    )

}

export default BracketDebug;
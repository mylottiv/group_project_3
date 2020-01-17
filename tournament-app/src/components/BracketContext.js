import React, {useState, useContext, createContext} from 'react';
import {TourneyContext} from './TourneyContext'
import {generateBracket, selectNodeRaw} from '../utils';

export const BracketContext = createContext();

export const BracketProvider = (props) => {
    
    const size = props.size;
    // const size = parseInt(props.match.params.number);
    const [array, setArray] = useState(generateBracket(size));
    const selectNode = selectNodeRaw(array, setArray);
    // const tree = renderTree(array, selectNode(array, setArray));
    const value = {array, selectNode}


    return (
        // <BracketContext.Provider value={array, setArray, tree}>
        <BracketContext.Provider value={value}>
            {props.children}
        </BracketContext.Provider>
    )
}
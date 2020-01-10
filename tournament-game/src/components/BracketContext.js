import React, {useState, createContext} from 'react';
import {generateBracket, renderTree, selectNodeRaw} from '../util';

export const BracketContext = createContext();

export const BracketProvider = (props) => {
    
    console.log('here at the provider');
    const size = parseInt(props.match.params.number);
    const [array, setArray] = useState(generateBracket(size));
    const selectNode = selectNodeRaw(array, setArray);
    // const tree = renderTree(array, selectNode(array, setArray));
    const value = {array, selectNode, size}


    return (
        // <BracketContext.Provider value={array, setArray, tree}>
        <BracketContext.Provider value={value}>
            {props.children}
        </BracketContext.Provider>
    )
}
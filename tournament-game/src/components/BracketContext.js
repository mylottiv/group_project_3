import React, {useState, createContext} from 'react';
import {generateBracket, renderTree, selectNode} from '../util';

export const BracketContext = createContext();

export const BracketProvider = (props) => {

    const size = parseInt(props.match.params.number);
    const [array, setArray] = useState(generateBracket(size));
    const tree = renderTree(array, selectNode(array, setArray));


    return (
        <BracketContext.Provider value={[array, setArray], tree}>
            {props.children}
        </BracketContext.Provider>
    )
}
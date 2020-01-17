import React, {useState, createContext, useEffect} from 'react';
import {generateBracket, selectNodeRaw} from '../../util';
import io from 'socket.io-client';
let socket;

export const BracketContext = createContext();

export const BracketProvider = (props) => {
    
    const size = props.size;
    const [array, setArray] = useState(generateBracket(size).games);
    const selectNode = selectNodeRaw(array, setArray);
    const [observed, setObserved] = useState({})
    console.log(observed, 'observe')
    const value = {array, selectNode, observed}
    useEffect(() => {
        socket = io('localhost:3001');
        console.log('hello', socket);
        socket.emit('join observer', 'test', ({error}) => alert(error));
        socket.on('observer state', (data) => {
            setObserved(data)
        })
    }, [])



    return (
        // <BracketContext.Provider value={array, setArray, tree}>
        <BracketContext.Provider value={value}>
            {props.children}
        </BracketContext.Provider>
    )
}
import React, {useState, createContext, useEffect, useReducer} from 'react';
import io from 'socket.io-client';
let socket;

export const TourneyContextDebug = createContext();

export const TourneyProviderDebug = (props) => {

    const reducer = (state, action) => {
        switch(action.type) {
            case 'initialize_tournament_data':
                return {...action.payload};
            case 'update_tournament_data':
                return {...action.payload};
            case 'test':
                state.test = 'test'
                return state
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, {});
    const [observed, setObserved] = useState({})
    const value = {state, observed};
    console.log(observed, 'observe');
    useEffect(() => {
        socket = io('localhost:3001');
        console.log('hello', socket);
        socket.on('initialize tournament data', (data) => {
            dispatch({type: 'initialize_tournament_data', payload: data});
        });
        socket.on('match updates', (data) => {
            dispatch({type: 'update_tournament_data', payload: data});
        })
    }, [])

    return (
        <TourneyContextDebug.Provider value={value}>
            {props.children}
        </TourneyContextDebug.Provider>
    )
}
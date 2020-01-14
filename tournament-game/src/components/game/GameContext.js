import React, {createContext, useEffect, useReducer} from 'react';
import io from 'socket.io-client';
let socket;

export const GameContext = createContext();

export const GameProvider = (props) => {

    const moves = ['rock', 'paper', 'scissors']

    const reducer = (state, action) => {
        switch(action.type) {
            case 'player_choose_move':
                return {...state, playerMove: action.payload, count: state.count + 1};
            case 'opp_choose_move':
                return {...state, oppMove: action.payload};
            case 'increment_score':
                return {...state, playerScore: state.playerScore + 1, oppScore: state.oppScore + 1}
            case 'increment_player_score':
                return {...state, playerScore: state.playerScore + 1}
            case 'increment_opp_score':
                return {...state, oppScore: state.oppScore + 1}
            case 'initialize_state':
                return {...action.payload};
            default:
                return state;
        }
    }

    const winnerEvaluation = () => (playerMove, oppMove, dispatch) => {

        if (playerMove === oppMove) {
            if (playerMove === '' && oppMove === '') {
                return;
            }
            console.log(playerMove, oppMove, 'Draw');
            return dispatch({type: 'increment_score'})
        }
        else if (playerMove === 'rock' && oppMove === 'scissors' ||
         playerMove === 'paper' && oppMove === 'rock' ||
          playerMove === 'scissors' && oppMove === 'paper') {
              console.log(playerMove, oppMove, 'Player wins');
              return dispatch({type: 'increment_player_score'})
          }
        else if (oppMove === 'rock' && playerMove === 'scissors' ||
        oppMove === 'paper' && playerMove === 'rock' ||
         oppMove === 'scissors' && playerMove === 'paper') {
             console.log(playerMove, oppMove, 'Opp wins');
             return dispatch({type: 'increment_opp_score'})
         }
        return dispatch({type:'increment_score'})
    }

    const [state, dispatch] = useReducer(reducer, {})
    const value = {state, dispatch};
    useEffect(() => {
        socket = io('localhost:3001');
        console.log('hello', socket);
        socket.emit('join game', 'test', ({error}) => alert(error));
        socket.on('initial state', (data) => {
            dispatch({type: 'initialize_state', payload: data});
        })
        socket.on('opp_move_selected', (data) => {
            console.log('testy');
            dispatch({type: 'opp_choose_move', payload: data});
        })
        // return () => {
        //     socket.emit('disconnect');
        //     socket.off();
        // }
    }, [])
    useEffect(() => {
        console.log(value.state.count, value.state.playerMove);
        if (value.state.count > 0) {
            console.log('triggered', value.state.count, value.state.playerMove);
            socket.emit('move selected', {move: value.state.playerMove}, ({error}) => alert(error));
        }
    }, [value.state.count])
    // useEffect(() => winnerEvaluation()(value.state.playerMove, value.state.oppMove, value.dispatch), [value.state.count]);




    return (
        <GameContext.Provider value={value}>
            {props.children}
        </GameContext.Provider>
    )
}
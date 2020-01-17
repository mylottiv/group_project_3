import React, {createContext, useEffect, useReducer} from 'react';
import io from 'socket.io-client';
let socket;

export const GameContext = createContext();

export const GameProvider = (props) => {

    const moves = ['rock', 'paper', 'scissors']

    const reducer = (state, action) => {
        switch(action.type) {
            case 'player_choose_move':
                return {...state, playerMove: action.payload, ready: !state.ready};
            case 'opp_choose_move':
                return {...state, oppMove: action.payload};
            case 'increment_score':
                return {...state, playerScore: state.playerScore + 1, oppScore: state.oppScore + 1}
            case 'player_wins_round':
                return {...state, playerScore: state.playerScore + 1, ready: false, roundWinner: 'Player'}
            case 'player_loses_round':
                return {...state, oppScore: state.oppScore + 1, ready: false, roundWinner: 'Opp'}
            case 'draw':
                return {...state, ready: false, roundWinner: 'Draw'}
            case 'player_wins_match':
                return {...state, matchWinner: 'Player'}
            case 'player_loses_match':
                return {...state, matchWinner: 'Opp'}
            case 'initialize_state':
                return {...action.payload};
            case 'reset_moves':
                return {...state, playerMove: '', oppMove: '', ready: false, roundWinner: ''}
            case 'ready':
                return{...state, ready: true}
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, {})
    const value = {state, dispatch};
    useEffect(() => {
        socket = io('localhost:3001');
        console.log('hello', socket);
        socket.emit('join game', 'test', ({error}) => alert(error));
        socket.on('initial game state', (data) => {
            dispatch({type: 'initialize_state', payload: data});
        })
        socket.on('opp move selected', (data) => {
            console.log('testy');
            dispatch({type: 'opp_choose_move', payload: data});
        });
        socket.on('player wins round', () => {
            console.log('player wins round');
            dispatch({type: 'player_wins_round'});
        });
        socket.on('player loses round', () => {
            console.log('player loses round');
            dispatch({type: 'player_loses_round'});
        });
        socket.on('draw', () => {
            console.log('draw');
            dispatch({type: 'draw'});
        })
        socket.on('new round', () => {
            console.log('new round');
            dispatch({type: 'reset_moves'});
        });
        socket.on('player wins match', () => {
            console.log('player wins match');
            dispatch({type: 'player_wins_match'});
        })
        socket.on('player loses match', () => {
            console.log('player loses match');
            dispatch({type: 'player_loses_match'});
        })
        // return () => {
        //     socket.emit('disconnect');
        //     socket.off();
        // }
    }, [])
    useEffect(() => {
        console.log(value.state.ready, value.state.playerMove);
        if (value.state.ready === true) {
            if (value.state.roundWinner === '' && value.state.matchWinner === '') {
                console.log('triggered', value.state.ready, value.state.playerMove);
                socket.emit('move selected', {move: value.state.playerMove}, ({error}) => alert(error));
            }
            else if (value.state.matchWinner === '') {
                socket.emit('ready for next round', {}, ({error}) => alert(error))
            }
            else if (value.state.matchWinner === 'Player') {
                socket.emit('ready for next match', {}, ({error}) => alert(error))
            }
        }

    }, [value.state.ready])
    // useEffect(() => winnerEvaluation()(value.state.playerMove, value.state.oppMove, value.dispatch), [value.state.count]);

    return (
        <GameContext.Provider value={value}>
            {props.children}
        </GameContext.Provider>
    )
}
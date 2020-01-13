import React, {createContext, useState, useEffect, useReducer} from 'react';

export const GameContext = createContext();

export const GameProvider = (props) => {

    const moves = ['rock', 'paper', 'scissors']

    const reducer = (state, action) => {
        switch(action.type) {
            case 'player_choose_move':
                return {...state, playerMove: action.payload, oppMove: moves[Math.floor(Math.random() * moves.length)], count: state.count + 1};
            case 'increment_score':
                return {...state, playerScore: state.playerScore + 1, oppScore: state.oppScore + 1}
            case 'increment_player_score':
                return {...state, playerScore: state.playerScore + 1}
            case 'increment_opp_score':
                return {...state, oppScore: state.oppScore + 1}
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


    const initialState = {playerMove: '', oppMove: '', playerScore: 0, oppScore: 0, count: 0}

    const [state, dispatch] = useReducer(reducer, initialState)
    const value = {state, dispatch}
    useEffect(() => winnerEvaluation()(value.state.playerMove, value.state.oppMove, value.dispatch), [value.state.count])



    return (
        // <BracketContext.Provider value={array, setArray, tree}>
        <GameContext.Provider value={value}>
            {props.children}
        </GameContext.Provider>
    )
}
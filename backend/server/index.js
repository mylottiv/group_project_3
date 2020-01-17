const app = require('express')();
const socketio = require('socket.io');

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log('Server listening on Port ' + PORT));
const io = socketio(server)

const router = require('./router');

app.use(router);

const initialState = {playerMove: '', oppMove: '', playerScore: 0, oppScore: 0, ready: false, roundWinner: '', matchWinner: ''};

/* 

const tournamentState = {
    name: "4 Player Tourney",
    depth: "2",
    games: [
        {
            node: {
                content: 'Finals,
                index: 0,
                parent: 0,
                sibling: 0
                child: [1, 2]
            },
            gameState:
            {
                player1: {
                    playerId: '',
                    currentMove: '',
                    playerScore: 0,
                    ready: false,
                },
                player2: {
                    playerId: '',
                    currentMove: '',
                    playerScore: 0,
                    ready: false,
                }, 
                roundWinner: '',
                matchWinner: ''
            }
        },
        {
            node: {
                content: '1st Semi-Finals',
                index: 1,
                parent: 0,
                sibling: 2
                child: [3, 4]
            },
            gameState:
            {
                player1: {
                    playerId: '',
                    currentMove: '',
                    playerScore: 0,
                    ready: false,
                },
                player2: {
                    playerId: '',
                    currentMove: '',
                    playerScore: 0,
                    ready: false,
                }, 
                roundWinner: '',
                matchWinner: ''
            },
        },
        {
            node: {
                content: 'Champion,
                index: 0,
                parent: 0,
                sibling: 0
                child: [1, 2]
            },
            gameState:
            {
                player1: {
                    playerId: '',
                    currentMove: '',
                    playerScore: 0,
                    ready: false,
                },
                player2: {
                    playerId: '',
                    currentMove: '',
                    playerScore: 0,
                    ready: false,
                }, 
                roundWinner: '',
                matchWinner: ''
            },
        },
        {
            node: {
                content: '2nd Semi-Finals,
                index: 2,
                parent: 0,
                sibling: 1
                child: [3, 4]
            },
            gameState:
            {
                player1: {
                    playerId: '',
                    currentMove: '',
                    playerScore: 0,
                    ready: false,
                },
                player2: {
                    playerId: '',
                    currentMove: '',
                    playerScore: 0,
                    ready: false,
                }, 
                roundWinner: '',
                matchWinner: ''
            },
        },
        {
            node: {
                content: 'Player 1',
                index: 3,
                parent: 1,
                sibling: 4,
                child: [5, 6]
            },
            gameState:
            {
                player1: {
                    playerId: '',
                    currentMove: '',
                    playerScore: 0,
                    ready: false,
                },
                player2: {
                    playerId: '',
                    currentMove: '',
                    playerScore: 0,
                    ready: false,
                }, 
                roundWinner: '',
                matchWinner: ''
            },
            {
                node: {
                    content: 'Player 1',
                    index: 3,
                    parent: 1,
                    sibling: 4,
                    child: [5, 6]
                },
                gameState:
                {
                    player1: {
                        playerId: '',
                        currentMove: '',
                        playerScore: 0,
                        ready: false,
                    },
                    player2: {
                        playerId: '',
                        currentMove: '',
                        playerScore: 0,
                        ready: false,
                    }, 
                    roundWinner: '',
                    matchWinner: ''
                },
            }
        },
    ]
}

*/

const testState = {
    player1: {
        playerId: '',
        currentMove: '',
        playerScore: 0,
        ready: false,
    },
    player2: {
        playerId: '',
        currentMove: '',
        playerScore: 0,
        ready: false,
    }, 
    roundWinner: '',
    matchWinner: ''
};

const determinePlayer = (playerId) => {
    const whichPlayer = (testState.player1.playerId === playerId) ? 'player1' : 'player2';
    console.log(whichPlayer, 'player');
    const oppPlayer = (whichPlayer === 'player1') ? 'player2' : 'player1';
    console.log(oppPlayer, 'opp');
    return {whichPlayer, oppPlayer}
}

const evaluateRoundWinner = (socket, io, testState) => ({whichPlayer, oppPlayer}, playerMove, oppMove) => {
        if (oppMove !== '') {
            if (playerMove === oppMove) {
                console.log(playerMove, oppMove, 'Draw');
                testState.roundWinner = 'draw'
                testState[whichPlayer].playerScore++
                testState[oppPlayer].playerScore++
                testState[whichPlayer].ready = false;
                testState[oppPlayer].ready = false;
                console.log(testState);
                socket.broadcast.to('game').emit('draw');
                socket.emit('draw');
                io.to('observer').emit('observer state', testState);
            }
            else if (playerMove === 'rock' && oppMove === 'scissors' ||
            playerMove === 'paper' && oppMove === 'rock' ||
            playerMove === 'scissors' && oppMove === 'paper') {
                console.log(playerMove, oppMove, 'Player wins');
                testState.roundWinner = whichPlayer;
                testState[whichPlayer].playerScore++;
                testState[whichPlayer].ready = false;
                testState[oppPlayer].ready = false;
                console.log(testState);
                socket.broadcast.to('game').emit('player loses round');
                socket.emit('player wins round');
                io.to('observer').emit('observer state', testState);
            }
            else if (oppMove === 'rock' && playerMove === 'scissors' ||
            oppMove === 'paper' && playerMove === 'rock' ||
            oppMove === 'scissors' && playerMove === 'paper') {
                console.log(playerMove, oppMove, 'Opp wins');
                testState.roundWinner = oppPlayer;
                testState[oppPlayer].playerScore++;
                testState[whichPlayer].ready = false;
                testState[oppPlayer].ready = false;
                console.log(testState);
                socket.broadcast.to('game').emit('player wins round');
                socket.emit('player loses round');
                io.to('observer').emit('observer state', testState);
            }
        }
}

const evaluateMatchWinner = (socket, io, testState) => ({whichPlayer, oppPlayer}) => {

    if (testState[whichPlayer].playerScore >= 5) {
        if (testState[oppPlayer].playerScore >= testState[whichPlayer].playerScore) {
            testState.matchWinner = oppPlayer;
            socket.broadcast.to('game').emit('player wins match');
            socket.emit('player loses match');
            io.to('observer').emit('observer state', testState);
        }
        else {
            testState.matchWinner = whichPlayer;
            socket.broadcast.to('game').emit('player loses match');
            socket.emit('player wins match');
            io.to('observer').emit('observer state', testState);
        }
    }
    else if (testState[oppPlayer].playerScore >= 5) {
        testState.matchWinner = oppPlayer;
        socket.broadcast.to('game').emit('player wins match');
        socket.emit('player loses match');
        io.to('observer').emit('observer state', testState);
    }
}

io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    io.emit('initial state', initialState);

    socket.on('join game', (data, callback) => {
        console.log('test:', data);

        let error = (data) ? false : true;

        if (error) {
            callback( {error: 'error'} )
        }

        else {
            socket.join('game');
            let whichPlayer = (testState.player1.playerId !== '') ? 'player2' : 'player1';
            testState[whichPlayer].playerId = socket.id;
            console.log('player Join Test', whichPlayer, testState[whichPlayer].playerId)
        }
    })

    socket.on('join observer', (data, callback) => {
        console.log('test', data);

        let error = (data) ? false : true;

        if (error) {
            callback( {error: 'error'} )
        }

        else {
            socket.join('observer');
            io.to('observer').emit('observer state', testState);
        }
    })

    socket.on('move selected', (data, callback) => {

        const {move} = data

        console.log('SELECTION FIRED', data, testState);

        let error = (data || data === '') ? false : true;


        if (error) {
            callback( {error: 'error'} )
        }

        // else if () {

        // }

        else {
            const players = determinePlayer(socket.id);
            testState[players.whichPlayer].currentMove = move;
            testState[players.whichPlayer].ready = true;
            evaluateRoundWinner(socket, io,  testState)(players, testState[players.whichPlayer].currentMove, testState[players.oppPlayer].currentMove)
            socket.broadcast.to('game').emit('opp move selected', move);
            evaluateMatchWinner(socket, io, testState)(players);
        }
    })

    socket.on('ready for next round', (data, callback) => {

        console.log('test:', data);

        let error = (data) ? false : true;

        if (error) {
            callback( {error: 'error'} )
        }

        const {whichPlayer, oppPlayer} = determinePlayer(socket.id);
        testState[whichPlayer].ready = true;
        if (testState[oppPlayer].ready) {
            testState.roundWinner = '';
            testState[whichPlayer].currentMove = '';
            testState[oppPlayer].currentMove = '';
            io.to('game').emit('new round')
        } 
    })

    socket.on('disconnect', (socket) => {
        console.log('user disconnected')
    })
})
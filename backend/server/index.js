const app = require('express')();
const socketio = require('socket.io');

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log('Server listening on Port ' + PORT));
const io = socketio(server)

// Bracket generation algorithim
const generateBracket = require('./generateBracket')

const router = require('./router');

app.use(router);

// Hardcoded test state
const initialState = {playerMove: '', oppMove: '', playerScore: 0, oppScore: 0, ready: false, roundWinner: '', matchWinner: ''};

const tourneyState = generateBracket(2);
// {
//     player1: {
//         playerId: '',
//         currentMove: '',
//         playerScore: 0,
//         ready: false,
//     },
//     player2: {
//         playerId: '',
//         currentMove: '',
//         playerScore: 0,
//         ready: false,
//     }, 
//     roundWinner: '',
//     matchWinner: ''
// };

// @params playerId String: id of given socket connection.
// Adds player to first open Player slot in Tournament
// Returns Int: Node index of joined Game
const joinOpenGame = (playerId) => {

    // Find index of first available Player node and update relevant playerId.
    const openPlayerIndex = tourneyState.games.findIndex(item => (item.playerState && item.playerState.playerId === ''));
    tourneyState.games[openPlayerIndex].playerState.playerId = playerId;

    // Find node index of joined game through parent property
    const openGame = tourneyState.games[tourneyState.games[openPlayerIndex].nodeState.parent]

    // Update game state if two players have now joined
    const [player1, player2] = openGame.nodeState.childNodes;
    if (tourneyState.games[player1].playerId !== '' && tourneyState.games[player2].playerId !== '') {
        openGame.gameState.waitingForPlayers = false;
    };

    return openGame.nodeState.index
}

// @params playerId String: id of given socket connection.
// Retrieves relevant game state of given player connection.
// Returns gameStatePointers Obj: Node index of game and whether client is player 1 or player 2
const determineGame = (playerId) => {

    // Find node index of current player
    const currentPlayerIndex = tourneyState.games.findIndex(item => (item.playerState && item.playerState.playerId === playerId));
    console.log(currentPlayerIndex, 'player');

    // Determine the player slots for current and opposing player
    const currentPlayer = (currentPlayerIndex % 2 === 0) ? 'player2' : 'player1';
    const oppPlayer= (currentPlayer === 'player2') ? 'player1' : 'player2';
    console.log(oppPlayer, 'opp');

    // Traverses "up" the tournament tree to find the current game the player is in
    const parent = tourneyState.games[currentPlayerIndex].nodeState.parent
    gameIndex = (tourneyState.games[parent].gameState.matchWinner !== currentPlayer) ? parent : tourneyState.games[parent].nodeState.parent;
    players = (gameIndex === parent) ? {currentPlayer, oppPlayer} : {currentPlayer: (parent % 2 === 0) ? 'player2' : 'player1', oppPlayer: (parent % 2 === 0) ? 'player1' : 'player2'} 
    return {gameIndex, players};
}

// @params gameState Obj: Game location, current player designations, and chosen player moves.
// Given the game state, determine winner of round, if any, and emit appropriate winstate events
// Returns Socket.emit: Emits win state to all relevant client connections
const evaluateRoundWinner = (socket, io, tourneyState) => (gameIndex, {currentPlayer, oppPlayer}, playerMove, oppMove) => {
        const openGame = tourneyState.games[gameIndex];

        const updateWinnerState = (winner) => {

            // Update winner state
            openGame.gameState.roundWinner = winner;

            // Determine win states to emit to player clients
            let winState = {player1: '', player2: ''};
            switch(winner){
                case('draw'):
                    // Set winState to 'Draw'
                    winState.player1 = winner;
                    winState.player2 = winner;
                case('player1'):
                    winState.player1 = 'player wins round';
                    winState.player2 = 'player loses round';
                case('player2'):
                    winState.player1 = 'player loses round';
                    winState.player2 = 'player wins round';
            }

            // Reset player ready status
            openGame.gameState['player1'].ready = false;
            openGame.gameState['player2'].ready = false;

            // Emit relevant winState to player client connections (where socket is the current player connection)
            socket.broadcast.to(openGame.nodeState.content + openGame.nodeState.index).emit(winState[oppPlayer]);
            socket.emit(winState[currentPlayer]);

            // Emit to observers
            // io.to('observer').emit('observer state', testState);
        }

        // Escape check if opponent has not chosen a move yet
        if (oppMove === '') {
            return
        }
        
        // Draw case
        if (playerMove === oppMove) {

            console.log(playerMove, oppMove, 'Draw');

            updateWinnerState('draw');

        }

        // Player Win case
        else if (playerMove === 'rock' && oppMove === 'scissors' ||
        playerMove === 'paper' && oppMove === 'rock' ||
        playerMove === 'scissors' && oppMove === 'paper') {

            console.log(playerMove, oppMove, 'Player wins');

            updateWinnerState(currentPlayer);

        }

        // Player Lose case
        else if (oppMove === 'rock' && playerMove === 'scissors' ||
        oppMove === 'paper' && playerMove === 'rock' ||
        oppMove === 'scissors' && playerMove === 'paper') {

            console.log(playerMove, oppMove, 'Opp wins');

            updateWinnerState(oppPlayer);

        }
    }
}

// @params gameState Obj: Game location and current player designations
// Given the game state, determine winner of match, if any, and emit appropriate winstate events
// Returns Socket.emit: Emits win state to all relevant client connections
const evaluateMatchWinner = (socket, io, tourneyState) => (gameIndex, {currentPlayer, oppPlayer}) => {

    const openGame = tourneyState.games[gameIndex];
    const updateWinnerState = (winner) => {

        // Determine win states to emit to player clients
        let winState = {player1: '', player2: ''};
        if (winner === 'player1') {
            winState.player1 = 'player wins match';
            winState.player2 = 'player loses match';
        }
        if (winner === 'player2') {
            winState.player1 = 'player loses match';
            winState.player2 = 'player wins match';
        }

        // Determine player node indexes relative to game parent
        const winnerIndex = (winState[currentPlayer] === 'player wins match') ? 0 : 1;
        const loserIndex = (winnerIndex === 0) ? 1 : 0;

        // Update game state
        openGame.gameState.matchWinner = winner;
        openGame.nodeState.primed = true;
        tourneyState.games[openGame.nodeState.childNodes[winnerIndex]].nodeState.winner = true;
        tourneyState.games[openGame.nodeState.childNodes[loserIndex]].nodeState.loser = true;

        // Emit winner state to client players
        socket.broadcast.to(openGame.nodeState.content + openGame.nodeState.index).emit(winState[oppPlayer]);
        socket.emit(winState[currentPlayer]);

        // Emit new tournament state to all clients (todo: all clients in given tournament room)
        io.emit('match updates', tourneyState);
        // io.to('observer').emit('observer state', testState);

        // Kick clients from room upon resolution 
        const gameRoom = tourneyState.games[gameIndex].nodeState.content + gameIndex
        io.sockets.clients(gameRoom).forEach(client => client.leave(gameRoom))
    }


    if (openGame.gameState[currentPlayer].playerScore === 3) {
        updateWinnerState(currentPlayer)
    }
    else if (openGame.gameState[oppPlayer].playerScore === 3) {
        updateWinnerState(oppPlayer)
    }
}

io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    io.emit('initial game state', initialState);

    io.emit('initialize tournament data', tourneyState);

    socket.on('join game', (data, callback) => {
        console.log('test:', data);

        let error = (data) ? false : true;

        if (error) {
            callback( {error: 'error'} )
        }

        else {
            const gameIndex = joinOpenGame(socket.id);
            console.log(gameIndex);
            socket.join(tourneyState.games[gameIndex].nodeState.content + gameIndex)
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

        console.log('SELECTION FIRED', data,);

        let error = (data || data === '') ? false : true;


        if (error) {
            callback( {error: 'error'} )
        }

        // else if () {

        // }

        else {
            const {gameIndex, players} = determineGame(socket.id);
            console.log(gameIndex, players);
            console.log(tourneyState.games[gameIndex]);
            tourneyState.games[gameIndex].gameState[players.currentPlayer].currentMove = move;
            tourneyState.games[gameIndex].gameState[players.currentPlayer].ready = true;
            evaluateRoundWinner(socket, io,  tourneyState)(gameIndex, players, move, tourneyState.games[gameIndex].gameState[players.oppPlayer].currentMove)
            socket.broadcast.to(tourneyState.games[gameIndex].nodeState.content + gameIndex).emit('opp move selected', move);
            evaluateMatchWinner(socket, io, tourneyState)(gameIndex, players);
        }
    })

    socket.on('ready for next round', (data, callback) => {

        console.log('test:', data);

        let error = (data) ? false : true;

        if (error) {
            callback( {error: 'error'} )
        }

        const {gameIndex, players} = determineGame(socket.id);
        tourneyState.games[gameIndex].gameState[players.currentPlayer].ready = true;
        if (tourneyState.games[gameIndex].gameState[players.oppPlayer].ready) {
            tourneyState.games[gameIndex].gameState.roundWinner = '';
            tourneyState.games[gameIndex].gameState[players.currentPlayer].currentMove = '';
            tourneyState.games[gameIndex].gameState[players.oppPlayer].currentMove = '';
            io.to(tourneyState.games[gameIndex].nodeState.content + gameIndex).emit('new round')
        } 
    })

    socket.on('ready for next match', (data, callback) => {

        console.log('test:', data);

        let error = (data) ? false : true;

        if (error) {
            callback( {error: 'error'} )
        }
        const {gameIndex, players} = determineGame(socket.id);
        tourneyState.games[gameIndex].gameState[players.currentPlayer].ready = true;
        socket.join(tourneyState.games[gameIndex].nodeState.content + gameIndex);
        console.log('Match Check', tourneyState.games[0], tourneyState.games[1], tourneyState.games[2]);
        socket.emit('initial game state', initialState);



    } )

    socket.on('disconnect', (socket) => {
        console.log('user disconnected')
    })
})
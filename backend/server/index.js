const app = require('express')();
const socketio = require('socket.io');

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log('Server listening on Port ' + PORT));
const io = socketio(server)
const generateBracket = require('./generateBracket')

const router = require('./router');

app.use(router);

const initialState = {playerMove: '', oppMove: '', playerScore: 0, oppScore: 0, ready: false, roundWinner: '', matchWinner: ''};

const tourneyState = generateBracket(2);

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

const joinOpenGame = (playerId) => {
    const openPlayerIndex = tourneyState.games.findIndex(item => (item.playerState && item.playerState.playerId === ''));
    tourneyState.games[openPlayerIndex].playerState.playerId = playerId;
    const openGame = tourneyState.games[tourneyState.games[openPlayerIndex].nodeState.parent]
    const [player1, player2] = openGame.nodeState.childNodes;
    if (tourneyState.games[player1].playerId !== '' && tourneyState.games[player2].playerId !== '') {
        openGame.gameState.waitingForPlayers = false;
    };
    return openGame.nodeState.index
}

const determineGame = (playerId) => {
    const currentPlayerIndex = tourneyState.games.findIndex(item => (item.playerState && item.playerState.playerId === playerId));
    console.log(currentPlayerIndex, 'player');
    const currentPlayer = (currentPlayerIndex % 2 === 0) ? 'player2' : 'player1';
    const oppPlayer= (currentPlayer === 'player2') ? 'player1' : 'player2';
    console.log(oppPlayer, 'opp');
    const parent = tourneyState.games[currentPlayerIndex].nodeState.parent
    gameIndex = (tourneyState.games[parent].gameState.matchWinner !== currentPlayer) ? parent : tourneyState.games[parent].nodeState.parent;
    players = (gameIndex === parent) ? {currentPlayer, oppPlayer} : {currentPlayer: (parent % 2 === 0) ? 'player2' : 'player1', oppPlayer: (parent % 2 === 0) ? 'player1' : 'player2'} 
    return {gameIndex, players};
}

const evaluateRoundWinner = (socket, io, tourneyState) => (openGameIndex, {currentPlayer, oppPlayer}, playerMove, oppMove) => {
        const openGame = tourneyState.games[openGameIndex];
        if (oppMove !== '') {
            if (playerMove === oppMove) {
                console.log(playerMove, oppMove, 'Draw');
                openGame.gameState.roundWinner = 'Draw'
                openGame.gameState[currentPlayer].ready = false;
                openGame.gameState[oppPlayer].ready = false;
                socket.broadcast.to(openGame.nodeState.content + openGame.nodeState.index).emit('draw');
                socket.emit('draw');
                io.to('observer').emit('observer state', testState);
            }
            else if (playerMove === 'rock' && oppMove === 'scissors' ||
            playerMove === 'paper' && oppMove === 'rock' ||
            playerMove === 'scissors' && oppMove === 'paper') {
                console.log(playerMove, oppMove, 'Player wins');
                openGame.gameState.roundWinner = currentPlayer;
                openGame.gameState[currentPlayer].playerScore++;
                openGame.gameState[currentPlayer].ready = false;
                openGame.gameState[oppPlayer].ready = false;
                socket.broadcast.to(openGame.nodeState.content + openGame.nodeState.index).emit('player loses round');
                socket.emit('player wins round');
                io.to('observer').emit('observer state', testState);
            }
            else if (oppMove === 'rock' && playerMove === 'scissors' ||
            oppMove === 'paper' && playerMove === 'rock' ||
            oppMove === 'scissors' && playerMove === 'paper') {
                console.log(playerMove, oppMove, 'Opp wins');
                openGame.gameState.roundWinner = oppPlayer;
                openGame.gameState[oppPlayer].playerScore++;
                openGame.gameState[currentPlayer].ready = false;
                openGame.gameState[oppPlayer].ready = false;
                socket.broadcast.to(openGame.nodeState.content + openGame.nodeState.index).emit('player wins round');
                socket.emit('player loses round');
                io.to('observer').emit('observer state', testState);
            }
        }
}

const evaluateMatchWinner = (socket, io, tourneyState) => (openGameIndex, {currentPlayer, oppPlayer}) => {

    const openGame = tourneyState.games[openGameIndex];
    if (openGame.gameState[currentPlayer].playerScore === 3) {
        const childIndex = (currentPlayer === 'player1') ? 0 : 1;
        const otherIndex = (childIndex === 0) ? 1 : 0;
        openGame.gameState.matchWinner = currentPlayer;
        openGame.nodeState.primed = true;
        tourneyState.games[openGame.nodeState.childNodes[childIndex]].nodeState.selected = true;
        tourneyState.games[openGame.nodeState.childNodes[otherIndex]].nodeState.loser = false;
        socket.broadcast.to(openGame.nodeState.content + openGame.nodeState.index).emit('player loses match');
        socket.emit('player wins match');
        io.emit('match updates', tourneyState);
        socket.leave(tourneyState.games[gameIndex].nodeState.content + gameIndex);
        io.to('observer').emit('observer state', testState);
    }
    else if (openGame.gameState[oppPlayer].playerScore === 3) {
        const childIndex = (oppPlayer === 'player1') ? 0 : 1;
        const otherIndex = (childIndex === 0) ? 1 : 0;
        openGame.gameState.matchWinner = oppPlayer;
        openGame.nodeState.primed = true;
        tourneyState.games[openGame.nodeState.childNodes[childIndex]].nodeState.selected = true;
        tourneyState.games[openGame.nodeState.childNodes[otherIndex]].nodeState.loser = true;
        socket.broadcast.to(openGame.nodeState.content + openGame.nodeState.index).emit('player wins match');
        socket.emit('player loses match');
        io.emit('match updates', tourneyState);
        socket.leave(tourneyState.games[gameIndex].nodeState.content + gameIndex);
        io.to('observer').emit('observer state', testState);
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
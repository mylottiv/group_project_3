const app = require('express')();
const socketio = require('socket.io');

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log('Server listening on Port ' + PORT));
const io = socketio(server)
const socketListeners = require('socketListeners');
const socketHandlers = require('socketHandlers')

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


io.on('connection', (socket) => {

    // Initialize Socket Listeners and Handlers
    socketListeners(socketHandlers(io, initialState, tourneyState, socket));
})
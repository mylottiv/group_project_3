const app = require('express')();
const socketio = require('socket.io');

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log('Server listening on Port ' + PORT));
const io = socketio(server)

const router = require('./router');

app.use(router);

const initialState = {playerMove: '', oppMove: '', playerScore: 0, oppScore: 0, count: 0};

const testState = {player1: {playerId: '', playerMove: '', playerScore: 0}, player2: {playerId: '', playerMove: '', playerScore: 0}};

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
        }
    })

    socket.on('move selected', (data, callback) => {

        const {move} = data

        console.log('SELECTION FIRED', data);

        let error = (data || data === '') ? false : true;

        if (error) {
            callback( {error: 'error'} )
        }

        else {
            let whichPlayer = (testState.player1.playerId !== socket.id) ? 'player2' : 'player1';
            testState[whichPlayer].playerMove = move;
            console.log('save test', testState)
            socket.broadcast.to('game').emit('opp_move_selected', move);
        }
    })

    socket.on('disconnect', (socket) => {
        console.log('user disconnected')
    })
})
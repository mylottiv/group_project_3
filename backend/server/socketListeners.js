module.exports = (socketHandlers) => {
       
        socketHandlers.onConnect();

        // socket.on('join observer', (data, callback) => {
        //     console.log('test', data);

        //     let error = (data) ? false : true;

        //     if (error) {
        //         callback( {error: 'error'} )
        //     }

        //     else {
        //         socket.join('observer');
        //         io.to('observer').emit('observer state', testState);
        //     }
        // })

        socket.on('join game', socketHandlers.onJoinGame)

        socket.on('move selected', socketHandlers.onMoveSelect)

        socket.on('ready for next round', socketHandlers.onRoundReady)

        socket.on('ready for next match', socketHandlers.onMatchReady)

        socket.on('disconnect', socketHandlers.onDisconnect)
}
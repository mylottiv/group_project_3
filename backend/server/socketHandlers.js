module.exports = (io, initialState, tourneyState, socket) => {
    const gameLogic = require('gameLogic')(io, socket, tourneyState);
    return {

        onConnect: () => {
            // Initialize local game state for client
            socket.emit('initial game state', initialState);
        
            // Pass current tournament state to client
            socket.emit('initialize tournament data', tourneyState);
        },

        onJoinGame: (data, callback) => {
            console.log('test:', data);
    
            let error = (data) ? false : true;
    
            if (error) {
                callback( {error: 'error'} )
            }
    
            else {
                // Add new player connection to open game
                const gameIndex = gameLogic.joinOpenGame(socket.id);
                console.log(gameIndex);
    
                // Connect client to relevant game room
                socket.join(tourneyState.games[gameIndex].nodeState.content + gameIndex)
            }
        }, 

        onMoveSelect: (data, callback) => {

            const {move} = data
    
            console.log('SELECTION FIRED', data,);
    
            let error = (data || data === '') ? false : true;
    
    
            if (error) {
                callback( {error: 'error'} )
            }
    
            else {
    
                // Determine current game and which slot client player is in
                const {openGame, players} = gameLogic.determineGame(socket.id);
                console.log(openGame, players);
                
                openGame.gameState[players.currentPlayer].currentMove = move;
                openGame.gameState[players.currentPlayer].ready = true;
                gameLogic.evaluateRoundWinner(openGame, players, move, openGame.gameState[players.oppPlayer].currentMove)
                socket.broadcast.to(openGame.nodeState.content + openGame.nodeState.index).emit('opp move selected', move);
                gameLogic.evaluateMatchWinner(openGame, players);
            }
        },

        onRoundReady: (data, callback) => {

            console.log('test:', data);
    
            let error = (data) ? false : true;
    
            if (error) {
                callback( {error: 'error'} )
            }
    
            // Update ready state for current player
            const {openGame, players} = gameLogic.determineGame(socket.id);
            openGame.gameState[players.currentPlayer].ready = true;
    
            // If both players are ready: reset round and move state, emit to game room
            if (openGame.gameState[players.oppPlayer].ready) {
                openGame.gameState.roundWinner = '';
                openGame.gameState[players.currentPlayer].currentMove = '';
                openGame.gameState[players.oppPlayer].currentMove = '';
                io.to(openGame.nodeState.content + openGame.nodeState.index).emit('new round')
            } 
        },

        onMatchReady: (data, callback) => {

            console.log('test:', data);
    
            let error = (data) ? false : true;
    
            if (error) {
                callback( {error: 'error'} )
            }
    
            // Update ready state for current player
            // Should retrieve the next game "up" the tree, due to traversal inside determineGame
            const {openGame, players} = gameLogic.determineGame(socket.id);
            openGame.gameState[players.currentPlayer].ready = true;
    
            // Add player to (now) current game room
            socket.join(openGame.nodeState.content + openGame.nodeState.index);
            console.log('Match Check', tourneyState.games[0], tourneyState.games[1], tourneyState.games[2]);
    
            // Initialize local game state for player
            socket.emit('initial game state', initialState);
    
        },
        
        onDisconnect: (socket) => {
            console.log('user disconnected')
        }
    }
}
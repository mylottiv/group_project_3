module.exports = (io, socket, tourneyState) => {
    return {
        
        // @params playerId String: id of given socket connection.
        // Adds player to first open Player slot in Tournament
        // Returns Int: Node index of joined Game
        joinOpenGame: (playerId) => {

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
        },

        // @params playerId String: id of given socket connection.
        // Retrieves relevant game state of given player connection.
        // Returns gameStatePointers Obj: Node index of game and whether client is player 1 or player 2
        determineGame: (playerId) => {

            // Find node index of current player
            const currentPlayerIndex = tourneyState.games.findIndex(item => (item.playerState && item.playerState.playerId === playerId));
            console.log(currentPlayerIndex, 'player');

            // Determine the player slots for current and opposing player
            const currentPlayer = (currentPlayerIndex % 2 === 0) ? 'player2' : 'player1';
            const oppPlayer= (currentPlayer === 'player2') ? 'player1' : 'player2';
            console.log(oppPlayer, 'opp');

            // Traverses "up" the tournament tree to find the current game the player is in
            const parent = tourneyState.games[currentPlayerIndex].nodeState.parent
            const gameIndex = (tourneyState.games[parent].gameState.matchWinner !== currentPlayer) ? parent : tourneyState.games[parent].nodeState.parent;
            const players = (gameIndex === parent) ? {currentPlayer, oppPlayer} : {currentPlayer: (parent % 2 === 0) ? 'player2' : 'player1', oppPlayer: (parent % 2 === 0) ? 'player1' : 'player2'} 
            const openGame = tourneyState.games[gameIndex]

            return {openGame, players};
        },

        // @params gameState Obj: Game location, current player designations, and chosen player moves.
        // Given the game state, determine winner of round, if any, and emit appropriate winstate events
        // Returns Socket.emit: Emits win state to all relevant client connections
        evaluateRoundWinner: (openGame, {currentPlayer, oppPlayer}, playerMove, oppMove) => {

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
        },

        // @params gameState Obj: Game location and current player designations
        // Given the game state, determine winner of match, if any, and emit appropriate winstate events
        // Returns Socket.emit: Emits win state to all relevant client connections
        evaluateMatchWinner: (openGame, {currentPlayer, oppPlayer}) => {

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
                const gameRoom = openGame.nodeState.content + openGame.nodeState.index;
                io.sockets.clients(gameRoom).forEach(client => client.leave(gameRoom))
            }


            if (openGame.gameState[currentPlayer].playerScore === 3) {
                updateWinnerState(currentPlayer)
            }
            else if (openGame.gameState[oppPlayer].playerScore === 3) {
                updateWinnerState(oppPlayer)
            }
        }
    }
}
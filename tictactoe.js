//Gameboard module, creates the boards, marks correct divs and resets the board
const Gameboard = (() => {
    let board = ['','','','','','','','',''];
    const playableDivs = Array.from(document.querySelectorAll('.playable-div'));
    let counter = 0;
    const markDiv = function (){
        if(this.textContent == ''){     
            if(counter == 0){
                let resultDiv = document.querySelector('#result');
                resultDiv.style = 'visibility: hidden';
            }
            this.textContent = choosePlayers.getNames.currentPlayer.playerMarker();
            let x = playableDivs.indexOf(this);
            board.splice(x, 1, this.textContent);
            choosePlayers.getNames.currentPlayer.playerChoices.push(x);
            counter ++;
            winnerAssessment.checkWinner(choosePlayers.getNames.currentPlayer);
            choosePlayers.getNames.currentPlayer.switchPlayers();
        }
    };
    playableDivs.forEach((playableDiv) => {
        playableDiv.addEventListener('click', markDiv);
    }) 
    const reset = function (){
        board = ['','','','','','','','',''];
        choosePlayers.getNames.player1.playerChoices = [];
        choosePlayers.getNames.player2.playerChoices = [];
        playableDivs.forEach((playableDiv) => {
            playableDiv.textContent = '';
        }) ;
        counter = 0;
    }
    return {
        reset, counter
    }
})();

//takes input as player names and initializes players
const choosePlayers = (() => {
    const Player = (name, marker) => {
        const playerName = () => name
        const playerMarker = () => marker
        const playerChoices = [];
        const switchPlayers = () => {
            let player1Selector = document.querySelector('#player1-name');
            let player2Selector = document.querySelector('#player2-name');
            if (getNames.currentPlayer === getNames.player1){
                getNames.currentPlayer = getNames.player2;
                player2Selector.style = 'text-decoration: underline'
                player1Selector.style = 'text-decoration: none'
            } else {
                getNames.currentPlayer = getNames.player1;
                player1Selector.style = 'text-decoration: underline'
                player2Selector.style = 'text-decoration: none'
            }
        }
        return {playerName, playerMarker, switchPlayers, playerChoices};
    }

    const getNames = (function(){
        let player1Name = prompt('First player name:');
        if (player1Name == ''){
            player1Name = 'Player 1'
        }
        let player2Name = prompt('Second player name:');
        if (player2Name == ''){
            player2Name = 'Player 2'
        }
        const player1 = Player(player1Name, 'O');
        const player2 = Player(player2Name, 'X');
        document.querySelector('#player1-name').textContent = `${player1.playerName()}`;
        document.querySelector('#player1-name').style = 'text-decoration: underline';
        document.querySelector('#player2-name').textContent = `${player2.playerName()}`;
        let currentPlayer = player1;
        return {player1, player2, currentPlayer}
    })();
    return{Player, getNames}
})();

//asseses wether there is a winner, if there  prints correct winner, if not prints draw message
const winnerAssessment = (() => {
    function checkWinner(player){
        if (Gameboard.counter == 9){
            let isThereAWinner = false;
            isWinner('', isThereAWinner);
        }
        const winningCombinations = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
        if(player.playerChoices.length >= 3){
            for (let i = 0; i < winningCombinations.length; i++){
                if (winningCombinations[i].every(x => player.playerChoices.includes(x))){
                    let isThereAWinner = true;
                    isWinner(player.playerName(), isThereAWinner);
                    break;
                }
            }
        }
    }
    function isWinner(name, isThereAWinner){
        let score1 = document.querySelector('#player1-score');
        let score2 = document.querySelector('#player2-score');
        score1.style = 'visibility: visible';
        score2.style =  'visibility: visible';
        let resultDiv = document.querySelector('#result');
        resultDiv.style = 'visibility: visible';
        if(isThereAWinner){
            resultDiv.textContent = (`${name} wins!`);
            if(name == choosePlayers.getNames.player1.playerName()){
                score1.textContent = parseInt(score1.textContent) + 1;
            } else if(name == choosePlayers.getNames.player2.playerName()){
                score2.textContent = parseInt(score2.textContent) + 1;
            }
        } else {
            resultDiv.textContent = 'Draw...';
        }
        Gameboard.reset();
    }
    return {checkWinner}
})();

//resets the board or starts new game when the button is clicked
const resetButtons = (() => {
    let score1 = document.querySelector('#player1-score');
    let score2 = document.querySelector('#player2-score');
    const newGameButton = document.querySelector('#new-game-button');
        newGameButton.addEventListener('click', () => {
            window.location.reload();
        });
    const resetButton = document.querySelector('#reset-button');
        resetButton.addEventListener('click', () => {
            score1.textContent = 0;
            score2.textContent = 0;
            score1.style = 'visibility: hidden';
            score2.style =  'visibility: hidden';
            let resultDiv = document.querySelector('#result');
                resultDiv.style = 'visibility: hidden';
            let player1Selector = document.querySelector('#player1-name');
            let player2Selector = document.querySelector('#player2-name');
                player1Selector.style = 'text-decoration: underline'
                player2Selector.style = 'text-decoration: none'
            Gameboard.reset();
            choosePlayers.getNames.currentPlayer = choosePlayers.getNames.player1;
        })

})();

const Gameboard = {
    board : ['','','','','','','','','']
};

const Player = (name, marker) => {
    const playerName = () => name
    const playerMarker = () => marker
    const playerChoices = [];
    const switchPlayers = () => {
        if (currentPlayer == player1){
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }
    return {playerName, playerMarker, switchPlayers, playerChoices};
}

const player1 = Player('Tomek', 'O');
const player2 = Player('Marek', 'X');
let currentPlayer = player1;

const gameboardDiv = document.querySelector('#gameboard');
const playableDivs = Array.from(document.querySelectorAll('.playable-div'));
    playableDivs.forEach((playableDiv) => {
        playableDiv.addEventListener('click', markDiv);
    })  

function markDiv() {
    if(this.textContent == ''){
        this.textContent = currentPlayer.playerMarker();
        let x = playableDivs.indexOf(this);
        Gameboard.board.splice(x, 1, this.textContent);
        currentPlayer.playerChoices.push(x);
        checkWinner(currentPlayer);
        currentPlayer.switchPlayers();
    }
};

function checkWinner(player){
    if(player.playerChoices.length >= 3){
        for (let i = 0; i < winningCombinations.length; i++){
            if (player.playerChoices.every(x => winningCombinations[i].includes(x))){
                console.log(player.playerName())
                isWinner(player.playerName());
                break;
            }
        }
    }
}

const winningCombinations = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[2, 4, 7],[3, 5, 8],[0, 4, 8],[2, 4, 6]];

function isWinner(name){
    alert(`${name} wins!`);
    if(name == player1.playerName()){
        let score = document.querySelector('#player1-score').textContent;
        score = parseInt(score) + 1;
        document.querySelector('#player1-score').textContent = score;
    } else {
        let score = document.querySelector('#player2-score').textContent;
        score = parseInt(score) + 1;
        document.querySelector('#player2-score').textContent = score;
    }
    reset();
}

function reset(){
    Gameboard.board = ['','','','','','','','',''];
    player1.playerChoices = [];
    player2.playerChoices = [];
    playableDivs.forEach((playableDiv) => {
        playableDiv.textContent = '';
    }) ;
    currentPlayer = player2;
}
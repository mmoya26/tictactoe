const Player = (name, sign, turn) => {
    return {
        name,
        sign,
        turn
    }
}

let playerOne = Player("Miguel", "X", true);
let playerTwo = Player("John", "O", false)

let Board = (function () {
    let gameBoard = ["","","","","","","","","",];
    let gameOver = false;

    const setUp = () => {
        const tilesContainer = document.querySelector(".tiles_container");

        for (let i = 1; i < 10; i++) {
            let tileElement = document.createElement("div");
            tileElement.classList.add("tile");
            tileElement.id = i;
            tileElement.addEventListener("click", () => {

                // If game is over, don't allow players to click more tiles, so return
                if(gameOver) return;
                
                /* If this method returns true it means that the correct sign was placed on the board and no turns
                    were lost. If the method  retuns false it means that the space was already filled thefore the turn 
                    should not be lost until the player picks and empty tile */
                if (DisplayController.markTitle(tileElement.id, playerOne.turn ? playerOne : playerTwo)) {
                    checkWinCondition();
                    switchTurns(false);       
                }
                return;
            })
            tilesContainer.appendChild(tileElement)
        }
    };

    const updateGameBoardArray = (id, sign) => {
        gameBoard[id - 1] = sign;
        console.log(`Array spot ${id - 1} has the value of: ${gameBoard[id - 1]}`);
        console.log(gameBoard);
    }

    const switchTurns = (clearIndicator) => {
        if (clearIndicator) {
            playerOne.turn = true;
            playerTwo.turn = false;
        } else {
            playerOne.turn = !playerOne.turn;
            playerTwo.turn = !playerTwo.turn;
        }
    }

    const checkWinCondition = () => {
        let currentPlayer = playerOne.turn ? playerOne : playerTwo;
        let signCounter = 0;
        let counter = 0;

        const winningSpots = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6], 
        ];

        winningSpots.forEach(array => {
            array.forEach( () => {
                if(!gameOver) {
                    if (gameBoard[array[counter]] === currentPlayer.sign) {
                        signCounter++;
    
                        if (signCounter === 3) {
                            gameOver = true;
                            return;
                        }
                    } else {
                        signCounter = 0;
                    }

                    counter++;

                    if (counter === 3) counter = 0;
                }
            });
        });

        if(gameOver) {
            DisplayController.alertWinner(currentPlayer);
            return;
        }
    }

    const resetGame = () => {
        gameBoard = ["","","","","","","","","",];
        gameOver = false;
        switchTurns(true);
    }

    return {
        gameBoard,
        setUp,
        updateGameBoardArray,
        switchTurns,
        checkWinCondition,
        resetGame
    }

})(playerOne, playerTwo);

let DisplayController = (function () {
    const markTitle = (id, player) => {
        let temporaryTitle = document.getElementById(`${id}`);

        if (temporaryTitle.textContent !== "") {
            console.log("Already filled");
            return false;
        } else {
            temporaryTitle.textContent = player.sign;
            Board.updateGameBoardArray(temporaryTitle.id, player.sign);
            return true;
        }
    }

    const clearBoard = () => {
        let tiles = document.querySelectorAll('.tile');

        tiles.forEach(tile => {
            tile.textContent = "";
        });
    }

    const alertWinner = (player) => {
        alert(`The winner is: ${player.name} Sign: ${player.sign}`);
    }

    return {
        markTitle,
        clearBoard,
        alertWinner
    }
})();

const clearButton = document.getElementById('clear');
clearButton.addEventListener("click", () => {
    DisplayController.clearBoard();
    Board.resetGame();
})

Board.setUp();
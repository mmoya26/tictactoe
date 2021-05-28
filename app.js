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

    const setUp = () => {
        const tilesContainer = document.querySelector(".tiles_container");

        for (let i = 1; i < 10; i++) {
            let tileElement = document.createElement("div");
            tileElement.classList.add("tile");
            tileElement.id = i;
            tileElement.addEventListener("click", () => {
                /* If this method returns true it means that the correct sign was placed on the board and no turns
                    were lost. If the method  retuns false it means that the space was already filled thefore the turn 
                    should not be lost until the player picks and empty tile */
                if (DisplayController.markTitle(tileElement.id, playerOne.turn ? playerOne : playerTwo)) {
                    switchTurns();
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

    const switchTurns = () => {
        // if(playerOne.turn === true) {
        //     playerOne.turn = false
        //     playerTwo.turn = true;
        // } else if (playerTwo.turn === true) {
        //     playerTwo.turn = false;
        //     playerOne.turn = true
        // }
        playerOne.turn = !playerOne.turn;
        playerTwo.turn = !playerTwo.turn;
    }

    const emptyGameBoardArray = () => {
        gameBoard = ["","","","","","","","","",];
    }

    return {
        gameBoard,
        setUp,
        updateGameBoardArray,
        switchTurns,
        emptyGameBoardArray
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

    return {
        markTitle,
        clearBoard
    }
})();

const clearButton = document.getElementById('clear');
clearButton.addEventListener("click", () => {
    DisplayController.clearBoard();
    Board.switchTurns();
    Board.emptyGameBoardArray();
})

Board.setUp();
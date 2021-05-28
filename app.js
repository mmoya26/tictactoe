let Board = (function () {
    let gameBoard = ["","","","","","","","","",];

    const setUp = () => {
        const tilesContainer = document.querySelector(".tiles_container");

        for (let i = 1; i < 10; i++) {
            let tileElement = document.createElement("div");
            tileElement.classList.add("tile");
            tileElement.id = i;
            tileElement.addEventListener("click", () => {
                DisplayController.markTitle(tileElement.id);
            })
            tilesContainer.appendChild(tileElement)
        }
    };

    const updateGameBoardArray = (id, sign) => {
        gameBoard[id - 1] = sign;
        console.log(`Array spot ${id - 1} has the value of: ${gameBoard[id - 1]}`);
        console.log(gameBoard);
    }

    return {
        gameBoard,
        setUp,
        updateGameBoardArray
    }

})();

let DisplayController = (function () {
    const markTitle = (id) => {
        let temporaryTitle = document.getElementById(`${id}`);

        if (temporaryTitle.textContent !== "") {
            console.log("Already filled");
            return;
        } else {
            temporaryTitle.textContent = "X";
            Board.updateGameBoardArray(temporaryTitle.id, "X");
        }
    }

    return {
        markTitle
    }
})();

const Player =  (name, sign) => {
    return {
        name,
        sign,
        turn
    }
}


Board.setUp();
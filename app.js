let Board = (function () {
    let gameBoard = ["","","","","","","","","",];

    const setUp = () => {
        const tilesContainer = document.querySelector(".tiles_container");

        for (let i = 1; i < 10; i++) {
            let tileElement = document.createElement("div");
            tileElement.classList.add("tile");
            tileElement.id = i;
            tilesContainer.appendChild(tileElement)
        }
    };

    return {
        gameBoard,
        setUp
    }

})();

// let displayController = (function () {

// })();


Board.setUp();
const Gameboard = (() => {
    let _board = null;
    let round = 0;
    
    function create() {
        round = 0;
        _board = new Array(3);
        for (let i = 0; i < _board.length; i++)
            _board[i] = new Array(null, null, null);
    }

    function checkWin() {
        for (let i = 0; i < _board.length; i++) {
            if (_board[i][0] == _board[i][1] && _board[i][1] == _board[i][2]) {
                if (_board[i][0] != null)
                    return true;
            }
        }
        for (let i = 0; i < _board.length; i++) {
            if (_board[0][i] == _board[1][i] && _board[1][i] == _board[2][i]) {
                if (_board[0][i] != null)
                    return true;
            }
        }
        if (_board[0][0] == _board[1][1] && _board[1][1] == _board[2][2]) {
            if (_board[0][0] != null)
                return true;
        }
        if (_board[0][2] == _board[1][1] && _board[1][1] == _board[2][0]) {
            if (_board[0][2] != null)
                return true;
        }
        return false;
    }

    function getBoard() {
        return _board;
    }

    return {round, getBoard, create, checkWin}
})();

const Gamecontroller = (() => {
    let _players = [{
        player: "Player 1",
        marker: "X"
    },
    {
        player: "Player 2",
        marker: "O"
    }]

    function _triggerMenu(winner) {
        let body = document.querySelector("body");
        let menuBackground = document.createElement("div");
        menuBackground.classList.add("menuBackground");

        let menu = document.createElement("div");
        menu.classList.add("menu");

        let proclamation = document.createElement("div");
        proclamation.classList.add("proclamation");
        if (winner == "Draw!")
            proclamation.textContent = `${winner}`;
        else
            proclamation.textContent = `${winner} won!`;

        let button = document.createElement("button");
        button.classList.add("new-game");
        button.textContent = "Start New Game";
        button.addEventListener("click", () => {
            let squares = document.querySelectorAll(".square");
            squares.forEach(square => square.textContent = "");
            body.removeChild(menuBackground);
            run();
        })

        menu.appendChild(proclamation);
        menu.appendChild(button);
        menuBackground.appendChild(menu);
        body.appendChild(menuBackground);
    }

    function run() {
        Gameboard.create();
        let board = Gameboard.getBoard();
        let activePlayer = _players[0];
        let winner = "";

        let squareCount = 1;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                let square = document.querySelector(`.s${squareCount++}`);
                square.addEventListener("click", e => {
                    Gameboard.round++;
                    e.target.textContent = activePlayer.marker;
                    board[i][j] = activePlayer.marker;
                    if (Gameboard.checkWin()) {
                        winner = activePlayer.player;
                        _triggerMenu(winner);
                    }
                    else if (Gameboard.round == 9) {
                        _triggerMenu("Draw!")
                    }
                    activePlayer = activePlayer == _players[0] ? _players[1] : _players[0];
                }, {once: true});
            }
        }
    }

    return {run};
})();

Gamecontroller.run();
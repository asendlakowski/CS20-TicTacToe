var x_or_o;
var grid = ["", "", "", "", "", "", "", "", ""];
var game_play;
var gameBoard;

function resetGame() {
    grid = ["", "", "", "", "", "", "", "", ""];
    game_play = true;
    var buttons = document.getElementsByTagName("button");
    for (let index = 1; index < 10; index++) {
        buttons[index].innerHTML = "";
    }
    let player = Math.floor((Math.random() * 2));
    document.getElementById("player_turn").innerHTML = turn(player);
}

function startPlayer() {
    let player = Math.floor((Math.random() * 2));
    document.getElementById("player_turn").innerHTML = turn(player);
    gameBoard = document.getElementById("gameBoard");

    makeBoard();
    resetGame();
}

function makeBoard() {
    for (let i = 0; i < 9; i++) {
        const box = document.createElement("button");
        box.setAttribute("id", i);
        box.addEventListener("click", function() { buttonPress(i); });
        box.innerHTML = "";
        gameBoard.appendChild(box);
        if (i == 2 || i == 5 || i == 8) {
            gameBoard.appendChild(document.createElement("br"));
        }
    }
}

function turn(player) {
    if (player == 0) {
        x_or_o = "O";
        return "Player O Turn";
    } else {
        x_or_o = "X";
        return "Player X Turn";
    }
}

function buttonPress(index) {
    if(grid[index] != "") {
        return;
    }
    var buttons = document.getElementsByTagName("button");
    grid[index] = x_or_o;
    buttons[index + 1].innerHTML = x_or_o;

    win_check();
    if (!game_play) {
        return;
    }
    if (x_or_o == "O") {
        x_or_o = "X";
    } else {
        x_or_o = "O";
    }
    document.getElementById("player_turn").innerHTML = "Player " + x_or_o + " Turn";
}

function win_check() {
    diag1 = 0; //0, 4, 8
    diag2 = 0; //2, 4, 6
    filled = 0;

    winner = "";
    for (let i = 0; i < 3; i++) {
        row = 0;
        col = 0;
        if (grid[i * 4] == x_or_o) {
            diag1++;
        }
        if (grid[i * 2 + 2] == x_or_o) {
            diag2++;
        }
        for (let j = 0; j < 3; j++) {
            if (grid[(i * 3) + j] != "") {
                filled++;
            }
            if (grid[(i * 3) + j] == x_or_o) {
                row++;
            }
            if (grid[i + (3 * j - 1)] == x_or_o) {
                col++;
            }
            if (row == 3 || col == 3 || diag1 == 3 || diag2 == 3) {
                winner = "Player " + x_or_o + " Won!";
                document.getElementById("player_turn").innerHTML = winner;
                game_play = false;
                return;
            }
            if (filled == 9) {
                winner = "Uh oh, it's a draw. Maybe try playing again?";
                document.getElementById("player_turn").innerHTML = winner;
                game_play = false;
                return;
            }
        }
    }
}

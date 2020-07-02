$(document).ready(function () {
    // setup Board and Players

    let board = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]]

    // give players the option to pick a color
    // we are player 1
    let player1 = "black"
    let player2 = "red"
    let currentPlayer = player1

    // setup HTML Page
    // create header

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    // Creates the Scoreboard and placement of the gameboard
    function setupDOM() {
        const header = `<header><h1>Connect 4</h1></header>`;
        const player1Title = capitalizeFirstLetter(player1)
        const player2Title = capitalizeFirstLetter(player2);
        const scoreBoard = `
            <div class="scoreBoard" id="scoreBoard">
                <div class="player ${player1}" id="player1">${player1Title}<br />
                    <div class="player black" id="player1Score">0</div>
                </div>
                <div class="player yellow" id="whosePlay">Play<br />
                    <div class="player ${currentPlayer}" id="whoseTurn">${currentPlayer}</div>
                </div>
                <div class="player ${player2}" id="player2">${player2Title}<br />
                    <div class="player black" id="player2Score">0</div>
                </div>
            </div>`
        const gameBoard = `<table id="board"></table>`

        $("body").prepend(header, scoreBoard, gameBoard);

    }


    function dropDisk(column, color) {
        let spotRow = findLowestRow(column)
        console.log(spotRow);

        // Animate disk drop with setInterval
        const setSpot = (row) => {
            $(`#${row}-${column}`).addClass(color);
        }
    
        const removeSpot = (row) => {
            $(`#${row}-${column}`).removeClass(color);
        }
    
        for (let row = 0; row <= spotRow; row++) {
            setTimeout(function() {
                console.log(row)
                if(row > 0) {
                    removeSpot(row-1)
                    setSpot(row)
                }

                // Next Move delayed until after the disc is dropped
                if(row === spotRow){
                    nextMove();
                }

            },row*250);
        }


        // $(`#${spotRow}-${column}`).addClass(color)
        // board[spotRow][column] = color
        // nextMove()

    }

    function findLowestRow(column) {
        for (let row = board.length - 1; row >= 0; row--) {
            if (board[row][column] === "") {
                console.log(`row: ${row}  col: ${column}`)
                return row
            }
        }
        console.log("Column is FULL")
        return "full"

    }

    function computerRandomDrop() {
        let column = Math.floor(Math.random() * 7)
        if (findLowestRow(column) != "full") {
            return dropDisk(column, currentPlayer)
        }
        else {
            // return computerRandomDrop()
        }
    }

    function aiDrop() {
        // check if opponent has 2 discs next to each other.  Drop to block one side.
        

        // check if opponent has 3 discs next to each other.  Drop to block.


        // if opponent has 3 discs next to each other and open on both sides. 
        // GAME OVER
    }

    function nextMove() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
            $('#whoseTurn').removeClass(player1);
            $('#whoseTurn').text(player2);
            $('#whoseTurn').addClass(player2);
            computerRandomDrop()

        }
        else {
            currentPlayer = player1;
            $('#whoseTurn').removeClass(player2);
            $('#whoseTurn').addClass(player1);
            $('#whoseTurn').text(player1);
        }
        console.log(checkRowWin());
    }

    function checkWin() {
        board.forEach(row => {
            for (let i = 0; i < 4; i++) {
                if (row[i] !== "" && 
                    row[i] === row[i + 1] && 
                    row[i] === row[i + 2] && 
                    row[i] === row[i + 3]) {

                    $(`#${scoreBoard}`).innerHTML(`<h2>Winner</h2><br />capitalizeFirstLetter(${row[i]})`)

                }
            }
        })

        for(let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++){
                if (board[r][c] !== "" && 
                    board[r][c] === board[r+1][c] && 
                    board[r+1][c] === board[r+2][c] && 
                    board[r+2][c] === board[r+3][c]) {

                        $(`#${scoreBoard}`).innerHTML(`<h2>Winner</h2><br />capitalizeFirstLetter(${row[i]})`)

                }
            }
        }

        for(let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++){
                if (board[r][c] !== "" && 
                    board[r][c] === board[r+1][c] && 
                    board[r+1][c] === board[r+2][c] && 
                    board[r+2][c] === board[r+3][c]) {

                        $(`#${scoreBoard}`).innerHTML(`<h2>Winner</h2><br />capitalizeFirstLetter(${row[i]})`)

                }
            }
        }




    }

    function checkColWin() {
        let outcoume=false;
    }


    $(document).on("click", ".drop-zone", (event) => {
        event.preventDefault();
        if (currentPlayer === player1) {
            let id = event.target.id
            let color = currentPlayer;
            dropDisk(id, color)
        }
        else {
            alert("It's not your turn!!")
        }
    })

    function createBoard() {
        let boardHeader = `<thead>
            <th id="0" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="1" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="2" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="3" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="4" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="5" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="6" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
        </thead>`
        $("#board").append(boardHeader)

        board.forEach((row, i) => {
            let rowVal = `<tr>
                <td id="${i}-0" data-col="0"> <i class="fas fa-circle fa-5x ${row[0]}"></i></td>
                <td id="${i}-1" data-col="1"> <i class="fas fa-circle fa-5x ${row[1]}"></i></td>
                <td id="${i}-2" data-col="2"> <i class="fas fa-circle fa-5x ${row[2]}"></i></td>
                <td id="${i}-3" data-col="3"> <i class="fas fa-circle fa-5x ${row[3]}"></i></td>
                <td id="${i}-4" data-col="4"> <i class="fas fa-circle fa-5x ${row[4]}"></i></td>
                <td id="${i}-5" data-col="5"> <i class="fas fa-circle fa-5x ${row[5]}"></i></td>
                <td id="${i}-6" data-col="6"> <i class="fas fa-circle fa-5x ${row[6]}"></i></td>
            </tr>`

            $("#board").append(rowVal)
        })
    }

    setupDOM();
    createBoard();


})



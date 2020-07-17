$(document).ready(function () {
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

    function dropDisk(column, color) {
        let placement = findLowestRow(column)
       
        // if we want to do animation, we can add from element 0 to placement
        // for (let i = 0; i < placement; i++) {
        //     $(`#${i}-${column}`).addClass(color)
        //     $(`#${i}-${column}`).removeClass(color)
        // }

        $(`#${placement}-${column}`).addClass(color)
        board[placement][column]= color
        takeTurns()



    }

    function findLowestRow(column){
        for (let i = board.length-1; i >= 0; i--) {
            if(board[i][column]===""){
                return i
            }
        }
        return "full"

    }

    function computerRandomDrop(){
        let selection = Math.floor(Math.random()*6)
        if(findLowestRow(selection) != "full"){
            return dropDisk(selection,currentPlayer)
        }
        else{
            // return computerRandomDrop()
        }
    }

    function takeTurns(){
        if(currentPlayer === player1){
            currentPlayer = player2
            computerRandomDrop()
            
        }
        else{
            currentPlayer = player1
        }
        // console.log(checkRowWin())

    }

    function checkRowWin(){
        let outcome = false
        board.forEach(row => {
            for(let i=0; i<4; i++){
                if(row[i] !== "" && row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row[i+3]){
                    outcome = row[i]
                }
            }
            
        })
        return outcome
        
    }


    $(document).on("click", ".drop-zone", (event) => {
        event.preventDefault();
        if(currentPlayer === player1){
            let id = event.target.id
            let color = currentPlayer;
            dropDisk(id, color)
        }
        else{
            alert("It's not your turn!!")
        }
        
    })

    function createBoard() {
        let header = `<thead>
            <th id="0" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="1" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="2" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="3" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="4" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="5" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="6" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
        </thead>`
        $("#board").append(header)


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
    createBoard()



 
})



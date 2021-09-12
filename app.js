console.log("Hello");
//https://github.com/sanyam-dev/TicTacToe.git
class player {
    constructor(name, symbol, bgclr, record ) {
        this.name = name;
        this.symbol = symbol;
        this.bgclr = bgclr;
        this.record = [];
    }
}

var player1 = new player("player1", "X", "rgb(0, 204, 255,0.5)");
var player2 = new player("player2", "O", "rgb(255, 102, 102, 0.5)");
var board = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']
];
var boardReset = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
];
var end = 0;
var move = 0;


function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// TODO: if Submit button is clicked in the form, change the player name and symbol!

function setName() {
    var n1 = document.getElementById("p1Name").value;
    var n2 = document.getElementById("p2Name").value;
    if(n1 != '')
    {
        player1.name = n1;
    }
    if(n2 != '')
    {
        player2.name = n2;
    }
    //getElementsByClassName gets an array, specify index!!!!
    document.getElementsByClassName("info")[0].style.visibility = "hidden";

}
let endflag = 0;
function onCellClick(cellID) {
    var id = parseInt(cellID[1]);
    let row = Math.floor(id / 3);
    let col = id % 3;
    let p;
    let lstp ;
    if (board[row][col] != '-') {
        console.log("INVALID MOVE!");
    }
    else {
        if (move % 2 == 0) {
            p = player1;
            lstp = player2;
        }
        else {
            p = player2;
            lstp = player1;
        }
        document.getElementById(cellID).innerHTML += p.symbol;
        document.getElementById(cellID).style.backgroundColor = p.bgclr;
        document.getElementById("playerName").innerHTML = lstp.name;
        p.record.push(cellID);
        board[row][col] = p.symbol;
        move = move + 1;
    }
    if(move > 4 && end != 1)
    {     
        if(checkWin(p))
        {
            endflag = 1;
            
                // alert(p.name + " WON!");
                // document.getElementById("Result").style.visibility = "visible";
                // document.getElementById("message").innerHTML = p.name;
                // endflag =1;
            // })
        }
            //TODO: else Draw situation!!
        else if(move == 9 && !checkWin(p))
        {
            endflag = 2;
        }
        if(endflag != 0)
        {
           resultPage(p);
        }
    }
}

//Decides the winner after every move > 5
function checkWin(p)
{
    for(let i = 0; i < 3; i++)
    {
        if(board[i][1] == p.symbol && board[i][0] == p.symbol && board[i][2] == p.symbol)    //row checks!
        {
            end = 1;
            console.log(p.name + " WINS! in row: " + i);
            return true;
        }
        else if (board[1][i] == p.symbol && board[0][i] == p.symbol && board[2][i] == p.symbol) { //column checks!
            console.log(p.name + " WINS! in col: " + i);
            end = 1;
            return true;
        }
    }
    if (board[0][0] == p.symbol && board[1][1] == p.symbol && board[2][2] == p.symbol)
    {
        end = 1;
        console.log(p.name + " WINS! with left-to-right diag ");
        return true;
    }
    else if (board[0][2] == p.symbol && board[2][0] == p.symbol && board[1][1] == p.symbol)
    {
        end = 1;
        console.log(p.name + " WINS! with right-to-left diag");
        return true;
    }
    else
    {
        return false;
    }

    //TODO: Add latency to the result so that player move can be seen!
    //DONE!!!!
}

function resultPage(p)
{
    if(endflag == 1)
    {
        document.getElementById("message").innerHTML = p.name + " Won! ";
        document.getElementById("playerName").innerHTML = p.name + " Won! :D";
    }
    else if(endflag == 2)
    {
        document.getElementById("message").innerHTML = "its a draw";
        document.getElementById("playerName").innerHTML = "Draw ://";
    }
    sleep(2000).then(document.getElementById("Result").style.visibility = "visible");

}
//This function Resets Board!!
function reset()
{
    board = boardReset;
    for(let i = 0; i < player1.record.length; i++)
    {
        document.getElementById(player1.record[i]).innerHTML -= player1.symbol;
        document.getElementById(player1.record[i]).style.backgroundColor -= player1.bgclr;
    }
    for (let i = 0; i < player2.record.length; i++) {
        document.getElementById(player2.record[i]).innerHTML -= player2.symbol;
        document.getElementById(player2.record[i]).style.backgroundColor -= player2.bgclr;
    }
    move = 0;
    document.getElementsByClassName("info")[0].style.visibility = "visible";
    document.getElementById("Result").style.visibility = "hidden";

}
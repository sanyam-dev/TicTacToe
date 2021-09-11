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
var end = 0;
var move = 0;

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

async function onCellClick(cellID) {
    // sleep
    var id = parseInt(cellID[1]);
    let row = Math.floor(id / 3);
    let col = id % 3;
    let p;
    let endflag = 0;
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
            endflag =1;
        }
        if(endflag)
        {
            alert(p.name + " WON!");
        }
        //TODO: else Draw situation!!
    }
    if(move == 9 && !checkWin(p))
    {
        document.getElementById("Result").style.visibility = "visible";
    }
    
}

function checkWin(p)
{
    for(let i = 0; i < 3; i++)
    {
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][1] != '-')    //row checks!
        {
            end = 1;
            console.log(p.name + " WINS!");
            return true;
        }
        else if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[1][i] != '-') { //column checks!
            console.log(p.name + " WINS!");
            end = 1;
            return true;
        }
    }
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1] != '-')
    {
        end = 1;
        console.log(p.name + " WINS!");
        return true;
    }
    else if(board[2][0] == board[1][1]  && board[1][1] == board[0][2] && board[1][1] != '-')
    {
        end = 1;
        console.log(p.name + " WINS!");
        return true;
    }
    else
    {
        return false;
    }

    //TODO: Add latency to the result so that player move can be seen!
}


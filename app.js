console.log("Hello");
// alert("CPU WORK IN PROGRESS")
cellList = []
for(let i = 0; i < 10; i++)
{
    var str1 = 'c' + i
    cellList.push(str1);
}
//https://github.com/sanyam-dev/TicTacToe.git

//Player
//TODO: Choose your own symbol functionality yet to be added!
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

//This will come handy in tracking game progress and wins!
var board = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']
];

var end = 0;
var move = 0;
let endflag = 0; 

var aiFlag= 0;
//for CPU
function cpu()
{
    alert("CPU WORK IN PROGRESS")
    // console.log("Hey! I'm your opponent, CPU!");
    // document.getElementById("vsCPU").style.visibility = "hidden";
    // document.getElementById("name1").style.visibility = "hidden";
    // document.getElementById("p1Name").style.visibility = "hidden";
    // player1.name = "CPU";
    // aiFlag = 1;
    // //impleementing a basic AI here!!
    // AImoves();
}

function AImoves()
{
    //player1 is AI here !!!!
    // (playerTurn(move) == player1) ? currentPlayer = player1 : currentPlayer = player2;

    if(playerTurn(move) == player1)
    {
        //How to determine move by cpu
        var cellIndex = Math.floor(Math.random() * cellList.length);     //will change minimax here later
        console.log("cell index: " + cellIndex);
        onCellClick(cellList[cellIndex]);
    }
    else
    {
        console.log("not my chance");
    }
    
}
//For Multiplayer games
function p2()
{
    var e = document.getElementById("player2");
    var e1 = document.getElementById("vsCPU");
    e1.style.visibility = "hidden";
}

//This functions sets up player names!
function setName(){
    var n1 = document.getElementById("p1Name").value;
    var n2 = document.getElementById("p2Name").value;
    var s1 = document.getElementById("p1Symbol").value;
    var s2 = document.getElementById("p2Symbol").value;
    if (n1 != undefined && player1.name != "CPU")
    {
        player1.name = n1;
        if (s1 != undefined)
        {
            player1.symbol = s1;
        }
    }
    if(n2 != undefined )
    {
        player2.name = n2;
        if (s2 != undefined) {
            player2.symbol = s2;
        }
    }
    // document.getElementsByClassName("info")[0].style.visibility = "hidden";
    document.getElementById("names").style.visibility = "hidden";
    document.getElementById("playerName").innerHTML = player1.name;
    move = 0;
    end = 0;
    endflag = 0;
}

//specify the turn of player
function playerTurn(move){
    if(move%2 == 0){return player1;}
    else{return player2;}  
}

// returns the info of the cell clicked and initiates the task of processing
var cellID, row, col;
function onCellClick(cellNumber)
{
    cellID = parseInt(cellNumber[1]);
    processClick(cellID);
    cellList.splice(cellID, 1);
    console.log("move number:  " + move);
    if(aiFlag == 1 && move%2 == 0)
    {
        againstAI();
    }
}

//defines what to do when a cell in the grid is clicked
function processClick(cellID)
{
    var currentPlayer = playerTurn(move);
    row = parseInt(cellID / 3);
    col = cellID % 3;
    var flagwin =0;

    move = move + 1;
    if(board[row][col] == '-')
    {
        visualChange(currentPlayer);
        board[row][col] = currentPlayer.symbol;
        if(checkWin(currentPlayer))
        {
            winPage(currentPlayer);
            flagwin = 1;
        }
        if(flagwin == 0 && move == 9)
        {
            console.log("its a draw");
            drawPage();
        }
        console.log(flagwin); 
    }
}

//defines what needs to be changed visually when a cell is clicked
function visualChange(p)
{
    var s = 'c' + cellID;
    document.getElementById(s).innerHTML = p.symbol;
    document.getElementById(s).style.backgroundColor = p.bgclr;
    p.record.push(cellID);
    if(p == player1)
    {
        document.getElementById("playerName").innerHTML = player2.name;
    }
    else
    {
        document.getElementById("playerName").innerHTML = player1.name;
    }
    
}

//Decides the winner after every move
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

//Triggering the win Page and feeding values
function winPage(p)
{
    document.getElementById("message").innerHTML = p.name + " Won! ";
    document.getElementById("playerName").innerHTML = p.name + " Won! :D";
    document.getElementById("Result").style.visibility = "visible";
}

//Triggers the draw page
function drawPage()
{
    document.getElementById("message").innerHTML = "its a draw";
    document.getElementById("playerName").innerHTML = "Draw ://";
    document.getElementById("Result").style.visibility = "visible";
}

//This function Resets Board!! (and also clears the previous data!)
function reset()
{
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            board[i][j] = '-';
        }
    }
    endflag = 0;
    move = 0;
    for(var i = 0; i < 9; i++)
    {
        var s = 'c' + i
        document.getElementById(s).innerHTML = "";
        document.getElementById(s).style.backgroundColor = "";

    }
    document.getElementById("names").style.visibility = "visible";
    document.getElementById("playerName").innerHTML = "Hit Submit to start";
    document.getElementById("Result").style.visibility = "hidden";
    document.getElementById("vsCPU").style.visibility = "hidden";
    
}


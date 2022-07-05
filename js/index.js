
var discs = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
];

let rows;
let columns;
const cellSize = 60;
const gap = 2;
let id = 1;
let scoreLabel;
//let discLayer;
let gameOver =false;

window.onload = function(){
    scoreLabel = document.getElementById("score");
    const blackBackground = document.getElementById("blackBackground");
    blackBackground.setAttribute('style', `width:${cellSize*8 + gap*9}px; height:${cellSize*8 + gap*9}px;`);
    drawGreenSquares(rows,columns,cellSize,gap);

    let discLayer = document.getElementById("discLayer");

    drawDiscs();
};

function drawGreenSquares(){
    for(rows = 0; rows < 8; rows++){
        for(columns = 0; columns < 8; columns++){
            let greenSquare = document.createElement("div");
            greenSquare.setAttribute('style', `position: absolute; background: green; height: ${cellSize}px; width: ${cellSize}px; top: ${(cellSize+gap)*rows+gap}px; left:${(cellSize+gap)*columns+gap}px`);
            blackBackground.appendChild(greenSquare);
            greenSquare.setAttribute("onclick","clickedSquare("+rows+","+columns+")");
        }

    }
    
};
//agrega fichas en el tablero, e intercambia los turnos.
function clickedSquare(row, column){
    
    if(gameOver){ return;}

    if(discs[row][column] != 0){
        return;
    }
    console.log("el lugar esta libre")

    if(canClickSpot(id,row,column) === true){
        console.log("click spot")
        let affectedDiscs = getAffectedDiscs(id,row,column);
        flipDiscs(affectedDiscs);

        discs[row][column] = id;
        if(id == 1 && canMove(2)){
            id = 2;
        }else if(id == 2 && canMove(1)){
            id = 1;
        }

        if (canMove(1) == false && canMove(2) == false){
            alert("game over");
            gameOver = true;
        }

        drawDiscs();
        redrawScore();
    }else{
        return;
    }
}

function canMove(id){
    for (let row = 0; row < 8; row++){
        for(let column = 0; column < 8; column++){
            if (canClickSpot(id,row,column)){
                return true;
            }
        }
    }
    return false;
}

function redrawScore(){
    let player1 = 0;
    let player2 = 0;
    for (let row = 0; row < 8; row++){
        for(let column = 0; column < 8; column++){
            let value = discs[row][column];
            if(value == 1){
                player1++;
            }else if(value == 2){
                player2++;
            }
        }
    }
    scoreLabel.innerHTML = "Black: "+player1+" White: "+player2;
}

function getAffectedDiscs(id,row,column){
    /**obtiene las fichas afectadas por la nueva ficha ingresada en el tablero */
    let affectedDiscs = [];
    
    //to the right
    let couldBeAffected = [];
    let columnIterator = column;
    while(columnIterator < 8){
        columnIterator++;
        let valueAtSpot = discs[row][columnIterator];
        if(valueAtSpot == 0 || valueAtSpot == id){
            if(valueAtSpot == id){
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }else{
            let discLocation = {row:row, column: columnIterator};
            couldBeAffected.push(discLocation);
        }
    }

    //to the left
    couldBeAffected = [];
    columnIterator = column;
    while(columnIterator < 8){
        columnIterator--;
        let valueAtSpot = discs[row][columnIterator];
        if(valueAtSpot == 0 || valueAtSpot == id){
            if(valueAtSpot == id){
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }else{
            let discLocation = {row:row, column: columnIterator};
            couldBeAffected.push(discLocation);
        }
    }

    //above
    couldBeAffected = [];
    let rowIterator = row;
    while(rowIterator > 0){
        rowIterator--;
        let valueAtSpot = discs[rowIterator][column];
        if(valueAtSpot == 0 || valueAtSpot == id){
            if(valueAtSpot == id){
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }else{
            let discLocation = {row:rowIterator, column: column};
            couldBeAffected.push(discLocation);
        }
    }

    //below
    couldBeAffected = [];
    rowIterator = row;
    while(rowIterator < 8){
        rowIterator++;
        let valueAtSpot = discs[rowIterator][column];
        if(valueAtSpot == 0 || valueAtSpot == id){
            if(valueAtSpot == id){
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }else{
            let discLocation = {row:rowIterator, column: column};
            couldBeAffected.push(discLocation);
        }
    }

    //diagonals
    //down right
    couldBeAffected = [];
    rowIterator = row;
    columnIterator = column;
    while(rowIterator < 7 && columnIterator < 7){
        rowIterator++;
        columnIterator++;
        let valueAtSpot = discs[rowIterator][columnIterator];
        if(valueAtSpot == 0 || valueAtSpot == id){
            if(valueAtSpot == id){
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }else{
            let discLocation = {row:rowIterator, column: columnIterator};
            couldBeAffected.push(discLocation);
        }
    }

    //down left
    couldBeAffected = [];
    rowIterator = row;
    columnIterator = column;
    while(rowIterator < 7 && columnIterator > 0){
        rowIterator++;
        columnIterator--;
        let valueAtSpot = discs[rowIterator][columnIterator];
        if(valueAtSpot == 0 || valueAtSpot == id){
            if(valueAtSpot == id){
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }else{
            let discLocation = {row:rowIterator, column: columnIterator};
            couldBeAffected.push(discLocation);
        }
    }

    //up left
    couldBeAffected = [];
    rowIterator = row;
    columnIterator = column;
    while(rowIterator > 0 && columnIterator > 0){
        rowIterator--;
        columnIterator--;
        let valueAtSpot = discs[rowIterator][columnIterator];
        if(valueAtSpot == 0 || valueAtSpot == id){
            if(valueAtSpot == id){
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }else{
            let discLocation = {row:rowIterator, column: columnIterator};
            couldBeAffected.push(discLocation);
        }
    }

    //up right
    couldBeAffected = [];
    rowIterator = row;
    columnIterator = column;
    while(rowIterator > 0 && columnIterator < 7){
        rowIterator--;
        columnIterator++;
        let valueAtSpot = discs[rowIterator][columnIterator];
        if(valueAtSpot == 0 || valueAtSpot == id){
            if(valueAtSpot == id){
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }else{
            let discLocation = {row:rowIterator, column: columnIterator};
            couldBeAffected.push(discLocation);
        }
    }

    return affectedDiscs;
}

function canClickSpot(id,row,column){
/*indica si el lugar donde se realizo el click es uno permitido*/
    let affectedDiscs = getAffectedDiscs(id,row,column);
    if(affectedDiscs.length == 0){
        return false;
    }else{
        return true;
    }
}

function flipDiscs(affectedDiscs){
    /**voltea las fichas que fueron afectadas por la nueva ficha */
    for(let i = 0; i < affectedDiscs.length; i++){
        let spot = affectedDiscs[i];
        if(discs[spot.row][spot.column] == 1){
            discs[spot.row][spot.column] = 2;
        }else{
            discs[spot.row][spot.column] = 1;
        }
    }

}

function drawDiscs(){
    console.log("creo los dicsos")
    
    discLayer.innerHTML = "";
    for(rows = 0; rows < 8; rows++){
        for(columns = 0; columns < 8; columns++){
            let disc = document.createElement("div");
            let value = discs[rows][columns];
            if(value == 0){

            }else{
                disc.setAttribute('style', `position: absolute; height: ${cellSize}px; width: ${cellSize}px; top: ${(cellSize+gap)*rows+gap}px; left:${(cellSize+gap)*columns+gap}px; border-radius: 50%;`);

                if(value == 1){
                    disc.style.background = "black";
                }else if(value == 2){
                    disc.style.background = "white";
                }
            }
            discLayer.appendChild(disc);
        }
    }
}
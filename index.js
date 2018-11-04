
let grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}



function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if (grid[colIdx][rowIdx]) {
      return;
    }
    let newValue;
    if (turn == "X") {
      newValue = 1;
    } else {
      newValue = 2;
    }
    toggleTurn();
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    checkIfGameIsOver();
  }


function checkIfGameIsOver() {
    // var temp=0;
    // var x= grid[0][0];
    
    for(var i=0; i<3;i++){


        if(i==0){
        if (grid[i][i]==2){
            if ((grid[i][i+1] ==2 && grid[i][i+2]==2) || (grid[i+1][i] ==2 && grid[i+2][i]==2) || (grid[i+1][i+1]==2 && grid[i+2][i+2]==2) )   
            gameover(2);
                

        }
        if (grid[i][i]==1){
            if ((grid[i][i+1] ==1 && grid[i][i+2]==1) || (grid[i+1][i] ==1 && grid[i+2][i]==1) || (grid[i+1][i+1]==1 && grid[i+2][i+2]==1) )
            gameover(1);
        } }


        if(i==1){
            if (grid[i][i]==2){
            if ((grid[i][i-1] ==2 && grid[i][i+1]==2) || (grid[i-1][i] ==2 && grid[i+1][i]==2)|| (grid[i-1][i+1] ==2 && grid[i+1][i-1]==2))
            gameover(2);
        }
            if (grid[i][i]==1){
                if ((grid[i][i-1] ==1 && grid[i][i+1]==1) || (grid[i-1][i] ==1 && grid[i+1][i]==1)|| (grid[i-1][i+1] ==1 && grid[i+1][i-1]==1))
                gameover(1);
        }  }




        if(i==2){

            if (grid[i][i]==2){
                if ((grid[i][i-1]==2 && grid[i][i-2]==2) || (grid[i-1][i] ==2 && grid[i-2][i]==2))
                gameover(2);
            }
            if (grid[i][i]==1){
                if ((grid[i][i-1] ==1 && grid[i][i-2]==1) || (grid[i-1][i] ==1 && grid[i-2][i]==1))
                gameover(1);
            } }
    
    }
}


function gameover(x) {
    setTimeout(function() {
      if (x == 2) alert("0 Won");
      else alert("X Won");
      grid = [];
      turn = "X";
      initializeGrid();
      renderMainGrid();
      addClickHandlers();
    }, 200);
  }

  function toggleTurn() {
    if (turn == "X") {
      turn = "O";
    } else {
      turn = "X";
    }
  }
function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
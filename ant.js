/*
  Authors:
    Valerie Martinez (valeriemartnz@csu.fullerton.edu)
    Anthony Sanchez (sanchezanthony244@csu.fullerton.edu)
    Bradley Diep (bdippin12@csu.fullerton.edu)
    Jason Duong (reddkingdom@csu.fullerton.edu)

  Description:
    The brain/logic of the ant
*/

const colors = ['#000000', '#89CFF0', '#FFF300', '#FF6347'];
const nose = ['N', 'W', 'S', 'E'];
const action =  [0, 1, 2, 1];

class Board {
  constructor(cell, width, height) {
    this.cell = cell;
    this.width = width;
    this.height = height;
    this.pixel = new Map();
  }

  increment_color() {
    let pos = '@' + ant.x + ant.y;
    let visited = board.pixel.has(pos);

    if (visited) {
      board.pixel.set(pos, (board.pixel.get(pos) + 1) % 4);
      fill(colors[board.pixel.get(pos)]);
    } else {
      board.pixel.set(pos, 1);
      fill(colors[1]); // we assume the cell was black
    }

    rect(ant.x, ant.y, this.cell, this.cell);
  }

  get_color(pos) {
    return (board.pixel.has(pos) ? board.pixel.get(pos) : 0);
  }
}

class Ant {
  constructor(x, y, state, nose, counter) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.nose = nose;
    this.counter = counter;
    this.adj_mat = [[0, 1], [1, 0]];
  }

  fsm (action) {
    let col;
    
    switch (this.state) {
      case 0 : { // Normal Mode
        col = 0;
        if (action == 0 || action == 1) { // L/R Action
          this.counter = board.get_color('@' + this.x + this.y);
          switch (action) {
            case 0 : ant.nose = ++ant.nose % 4; break;
            case 1 : ant.nose = (ant.nose == 0 ? 3 : ant.nose - 1);
          }
          console.log('Going ' + (action == 0 ? 'Left' : 'Right'));
        } else { // Countdown-Straight Action
          col = 1;
          console.log('Going to Countdown Mode');
        }
        break;
      }
      case 1 : { // Countdown-Straight Mode
        if (this.counter < 0) {
          col = 1;
          console.log('Going to Normal Mode');
        } else {
          col = 0;
          this.counter--;
          console.log(this.counter + 1 + ' left')
        }
      }
    }

    this.state = this.adj_mat[this.state][col];
  }

  move() {
    let dx = this.x;
    let dy = this.y;
    let size = board.cell;
    let max_width = board.width * size;
    let max_height = board.height * size;

    switch (nose[ant.nose]) {
      case 'N' : { dy = (dy == 0 ? max_height : dy) - size; break; } // cell index height = [0, 390]
      case 'E' : { dx = (dx + size) % max_width;  break; }           // example: (590 + 10) % 600 = 0
      case 'S' : { dy = (dy + size) % max_height; break; }           // example: (390 + 10) % 400 = 0
      case 'W' : { dx = (dx == 0 ? max_width : dx) - size; break; }  // cell index width = [0, 590]
    }

    this.x = dx; // move ant in x-dir
    this.y = dy; // move ant in y-dir
  }
}

var board = new Board(10, 60, 40);
var ant = new Ant(300, 200, 0, 0, 0);

var YOU_PRESSED_THE_RIGHT_ARROW_KEY = false;
keyPressed = () => {
  if (keyCode === RIGHT_ARROW) {
    YOU_PRESSED_THE_RIGHT_ARROW_KEY = true;
  }
}

function setup() {
  createCanvas(board.cell * board.width, board.cell * board.height);
  stroke('white');
}

function draw() {
//  if (YOU_PRESSED_THE_RIGHT_ARROW_KEY) {
  //  if (frameCount % 24 === 0) {
      ant.fsm(action[board.get_color('@' + ant.x + ant.y)]);
      board.increment_color();
      ant.move();
  //  }
//  }
//  YOU_PRESSED_THE_RIGHT_ARROW_KEY = false;
}
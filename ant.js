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
const nose = ['N','E', 'S', 'W'];
const action =  [0, 1, 2, 1];

class Board {
  constructor(cell, width, height) {
    this.cell = cell;
    this.width = width;
    this.height = height;
    this.pixel = [];
  }

  increment_color() {
    let dx = ant.x;
    let dy = ant.y;

    let px = this.pixel.find(element => element[0] == dx && element[1] == dy);

    if (px != undefined) {
      px[2] = (px[2] + 1) % 4;
      fill(colors[px[2]]);
    } else {
      this.pixel.push([dx, dy, 1]);
      fill(colors[1]); // we assume the cell was black
    }

    rect(ant.x, ant.y, this.cell, this.cell);
  }

  get_color(dx, dy) {
    let px = this.pixel.find(element => element[0] == dx && element[1] == dy);
    return (px != undefined ? px[2] : 0);
  }
}

class Ant {
  constructor(x, y, state, nose, counter) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.nose = nose;
    this.counter = counter;
  }

  fsm (action) {
    switch (this.state) {
      case 0 : { // Normal Mode
        if (action == 0 || action == 1) { // L/R Action
          this.counter = board.get_color(ant.x, ant.y);
          switch (action) {
            case 0 : ant.nose = ++ant.nose % 4; break;
            case 1 : ant.nose = (ant.nose == 0 ? 3 : ant.nose - 1);
          }
        } else { // Countdown-Straight Action
          this.state = 1;
        }
        break;
      }
      case 1 : { // Countdown-Straight Mode
        if (this.counter < 0) { this.state = 0; }
        else { this.counter--; }
      }
    }
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
  if (keyCode === RIGHT_ARROW) { YOU_PRESSED_THE_RIGHT_ARROW_KEY = true; }
}

function setup() {
  createCanvas(board.cell * board.width, board.cell * board.height);
  stroke('white');
}

function draw() {
//  if (YOU_PRESSED_THE_RIGHT_ARROW_KEY) {
//    if (frameCount % 50 === 0) {
      ant.fsm(action[board.get_color(ant.x, ant.y)]);
      board.increment_color();
      ant.move();
//    }
//  }
//  YOU_PRESSED_THE_RIGHT_ARROW_KEY = false;
}
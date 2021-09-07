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

var c_index = 0;
var n_index = 0;

class Board {
  constructor(cell, width, height) {
    this.cell = cell;
    this.width = width;
    this.height = height;
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

  move() {
    let dx = this.x;
    let dy = this.y;
    let size = board.cell;
    let max_width = board.width * size;
    let max_height = board.height * size;

    switch (nose[n_index]) {
      case 'N' : { dy = (dy == 0 ? max_height : dy) - size; break; } // cell index height = [0, 390]
      case 'E' : { dx = (dx + size) % max_width;  break; }           // example: (590 + 10) % 600 = 0
      case 'S' : { dy = (dy + size) % max_height; break; }           // example: (390 + 10) % 400 = 0
      case 'W' : { dx = (dx == 0 ? max_width : dx) - size; break; }  // cell index width = [0, 590]
    }

    this.x = dx; // move ant in x-dir
    this.y = dy; // move ant in y-dir

    c_index = ++c_index % 4;
  }

  fsm (action) {
    switch (this.state) {
      case 0 : { // Normal Mode
        if (action == 0 || action == 1) { // L/R Action
          this.counter = c_index;
          switch (action) {
            case 0 : n_index = ++n_index % 4; break;
            case 1 : n_index = (n_index == 0 ? 3 : n_index - 1);
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
  if (YOU_PRESSED_THE_RIGHT_ARROW_KEY) {
//    if (frameCount % 50 === 0) {
      ant.fsm(action[Math.floor(Math.random() * 4)]);

      // TODO:
      // Assumptions:
      //    get_color()       returns a hex color code => '#??????'
      //    array.indexOf()   returns the index of a value in an array
      //
      // Example:
      //    get_color() = '#FFFFFF' = Black
      //    c.indexOf(get_color()) = 1
      //    ++c.indexOf(get_color()) % 4 = (0 + 1) % 4 = 1 
      //    c[(++c.indexOf(get_color())) % 4] = c[1] = Blue
      // 
      // Implementation:
      //    let t = ant_bot.color;
      //    let inc = (++t.indexOf(get_color())) % 3;
      //    fill(ant_bot.color[inc]);

      fill(colors[c_index]);
      rect(ant.x, ant.y, board.cell, board.cell);

      ant.move();
  //  }
  }
  YOU_PRESSED_THE_RIGHT_ARROW_KEY = false;
}

function get_color(dx, dy, size, max_width) {
  let colors = get( dx, dy); // Get pixel color [RGBA] array.
  let pix_rgb =  // Ignore A = acolors[3], the transparency.
      (256 // Compose via Horner's Method.
       * (256 * (colors[ 2 ]) // B
          +  colors[ 1 ])) // G
      + colors[ 0 ]; // R
  //console.log( "acolors,pix_rgb = " + acolors + ", " + pix_rgb );
  return pix_rgb;
}
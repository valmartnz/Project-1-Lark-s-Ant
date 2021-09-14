/*
  Class: CPSC 335-03
  Assignment: Project 1

  Authors:
    Valerie Martinez (valeriemartnz@csu.fullerton.edu)
    Anthony Sanchez (sanchezanthony244@csu.fullerton.edu)
    Bradley Diep (bdippin12@csu.fullerton.edu)
    Jason Duong (reddkingdom@csu.fullerton.edu)

  Description:
    The brain/logic of the ant that computes the movement through a finite set of rules
*/

const colors = ['#000000', '#89CFF0', '#FFF300', '#FF6347'];
const nose = ['N', 'W', 'S', 'E'];
const action =  [0, 1, 2, 1];
const adj_mat = [[0, 1], [1, 0]];

class Board {
  constructor(cell, width, height) {
    this.cell = cell;
    this.width = width;
    this.height = height;
    this.pixel = new Map();
  }

  increment_color() {
    let pos = '@' + ant.x + ant.y;
    let visited = this.pixel.has(pos);
  
    if (visited) {
      this.pixel.set(pos, (board.pixel.get(pos) + 1) % 4);
      fill(colors[board.pixel.get(pos)]);

      switch (this.pixel.get(pos)) {
        case 0 : console.log('Increment Color to \"Black\" on ' + '(' + ant.x + ', ' + ant.y + ')');  break;
        case 1 : console.log('Increment Color to \"Blue\" on ' + '(' + ant.x + ', ' + ant.y + ')');   break;
        case 2 : console.log('Increment Color to \"Yellow\" on ' + '(' + ant.x + ', ' + ant.y + ')'); break;
        case 3 : console.log('Increment Color to \"Red\" on ' + '(' + ant.x + ', ' + ant.y + ')');
      }

    } else {
      this.pixel.set(pos, 1);
      fill(colors[1]); // we assume the cell was black
      console.log('Increment Color to \"Blue\" on ' + '(' + ant.x + ", " + ant.y + ')');
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
  }

  fsm (action) {
    let transition;
    
    switch (this.state) {
      case 0 : { // Normal Mode
        transition = 0;
        if (action == 0 || action == 1) {
          this.counter = board.get_color('@' + this.x + this.y);
          console.log('Reading Cell Color At: (' + this.x + ', ' + this.y + ') -> ' + (board.get_color('@' + this.x + this.y) == 0 ? 'Black' : board.get_color('@' + this.x + this.y) == 1 ? 'Blue' : board.get_color('@' + this.x + this.y == 3 ? 'Yellow' : 'Red')));
          switch (action) {
            case 0 : ant.nose = ++ant.nose % 4; break; // example: (3 + 1) % 4 = 0 -> North
            case 1 : ant.nose = (ant.nose == 0 ? 3 : ant.nose - 1);
          }
          console.log('Facing ' + (action == 0 ? 'Left' : 'Right'));
        } else { // Countdown-Straight Action
          transition = 1;
          console.log('Going to Countdown Mode');
        }
        break;
      }
      case 1 : { // Countdown-Straight Mode
        if (this.counter < 0) {
          transition = 1;
          console.log('Going to Normal Mode');
        } else { // Straight Mode
          transition = 0;
          this.counter--;
          console.log(this.counter + 1 + ' left')
        }
      }
    }

    this.state = adj_mat[this.state][transition]; // current->state = new_state
  }

  move() {
    let dx = this.x;
    let dy = this.y;
    let size = board.cell;
    let max_width = board.width * size;
    let max_height = board.height * size;

    switch (nose[ant.nose]) {
      case 'N' : { dy = (dy == 0 ? max_height : dy) - size; break; } // cell index height = [0, 390]
      case 'W' : { dx = (dx == 0 ? max_width : dx) - size; break; }  // cell index width = [0, 590]
      case 'S' : { dy = (dy + size) % max_height; break; }           // example: (390 + 10) % 400 = 0
      case 'E' : { dx = (dx + size) % max_width; }                   // example: (590 + 10) % 600 = 0
    }

    console.log(ant.nose == 0 ? 'Moving North' : ant.nose == 1 ? 'Moving West' : ant.nose == 2 ? 'Moving South' : 'Moving East');
    this.x = dx; // move ant in x-dir
    this.y = dy; // move ant in y-dir
  }
}

// creating objects
const board = new Board(10, 60, 40);
const ant = new Ant(300, 200, 0, 0, 0);

var step = false;
var walk = true; // starts by walking
var run = false;

keyTyped = () => {
	switch (key) {
		case ' ' : step = true; walk = false; run = false; break;
		case 'w' : walk = true; run = false; break; 
		case 'r' : run = true; walk = false;
	}
}

function setup() {
  createCanvas(board.cell * board.width, board.cell * board.height);
  stroke('white');
  console.log(ant.nose == 0 ? 'Facing North' : '');
}

function draw() {
  if (step) {
		update();
	  step = false;
  }
  else if (walk) {
    if (frameCount % 24 === 0) { // shows ant on every 24 frames
		  update();
    }
  }
  else if (run) {
    update();
  }
}

function update() {
  ant.fsm(action[board.get_color('@' + ant.x + ant.y)]); // completes steps 1-3
  board.increment_color(); // completes steps 4
  ant.move(); // completes steps 5
}
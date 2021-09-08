/*
  Authors:
    Valerie Martinez (valeriemartnz@csu.fullerton.edu)
    Anthony Sanchez (sanchezanthony244@csu.fullerton.edu)
    Bradley Diep (bdippin12@csu.fullerton.edu)
    Jason Duong (reddkingdom@csu.fullerton.edu)

  Description:
    The brain/logic of the ant

  Changes made by Val:
    -I didn't delete any of the previous code, only commented it out, so feel free to change things back if they work
     better that way.
    -Made some things global variables for easier access instead of complicating things
     with classes.
    -Added some of the functions the prof had such as draw_bot() and draw_update()
    -The FSM reads in the mode but now it only switches between red and black;
     not sure where I went wrong.
        -> It could be that the mode is not incremented correctly,
           or I made the action-map incorrect, but I think it can read
           the colors correctly because it can switch between two.
    -Ant moves slower, but like I said it only changes between two colors now.
    -Can't tell if i made it better or worse :/, but the fsm is structured to 
     be like what he wanted us to do, so idk.
*/

var g_canvas = { cell_size:10, wid:60, hgt:40 };
var g_frame_cnt = 0;
var g_frame_mod = 24; 
var g_stop = 0;

var g_bot = { dir:0, x:24, y:32 };
var g_box = { t:1, hgt:40, l:1, wid:60 };
var colors = ['#000000', '#89CFF0', '#FFF300', '#FF6347'];
var actionMap = [0, 1, 2, 1];
var mode = 0;
var countdown = 0;
var fsmCount = 1;
var dir = 0;


function setup() {
  createCanvas(g_canvas.cell_size * g_canvas.wid, g_canvas.cell_size * g_canvas.hgt);
  stroke('white');
}

var position = Array(g_canvas.hgt);
for (var i = 0; i < g_canvas.hgt; i++) {
  position[i] = new Array(g_canvas.wid);
}
for (var i = 0; i < g_canvas.hgt; i++) {
  for (var j = 0; j < g_canvas.wid; j++) {
    position[i][j] = 3;
  }
}
//const nose = ['N', 'W', 'S', 'E'];
//const action =  [0, 1, 2, 1];

// class Board {
//   constructor(cell, width, height) {
//     this.cell = cell;
//     this.width = width;
//     this.height = height;
//     this.pixel = new Map();
//   }

//   increment_color() {
//     let pos = '@' + ant.x + ant.y;
//     let visited = board.pixel.has(pos);

//     if (visited) {
//       board.pixel.set(pos, (board.pixel.get(pos) + 1) % 4);
//       fill(colors[board.pixel.get(pos)]);
//     } else {
//       board.pixel.set(pos, 1);
//       fill(colors[1]); // we assume the cell was black
//     }

//     rect(ant.x, ant.y, this.cell, this.cell);
//   }

//   get_color(pos) {
//     return (board.pixel.has(pos) ? board.pixel.get(pos) : 0);
//   }
// }

function turnLeft() {
  if (g_bot.dir == 0) {
    return direction = 3;
  }
  if (g_bot.dir == 1) {
    return direction = 0;
  }
  if (g_bot.dir == 2) {
    return direction = 1;
  }
  if (g_bot.dir == 3) {
    return direction = 2;
  }
}

function turnRight() {
  if (g_bot.dir == 0) {
    return direction = 1;
  }
  if (g_bot.dir == 1) {
    return direction = 2;
  }
  if (g_bot.dir == 2) {
    return direction = 3;
  }
  if (g_bot.dir == 3) {
    return direction = 0;
  }
}

function count() {
  mode = 1;
  return g_bot.dir;
}

function antFSM() {
  let dx = 0;
  let dy = 0;
  
  switch(mode) {
    case 0 : // Normal Mode
      if (position[g_bot.x][g_bot.y] === 3) {
         dir = turnLeft();
      } 
      else if (position[g_bot.x][g_bot.y] === 2) {
          dir = turnRight();
      }
      else if (position[g_bot.x][g_bot.y] === 1) {
          dir = count();
      }
      else if (position[g_bot.x][g_bot.y] === 0) {
          dir = turnLeft();
      }
      break;
    case 1 : // Countdown-Straight Mode
      if (postion[g_bot.x][g_bot.y] === 3){
          countdown = 3;
      }
      else if (cellStates[g_bot.x][g_bot.y] === 2){
          countdown = 2;
      }
      else if (cellStates[g_bot.x][g_bot.y] === 1){
          countdown = 1;
      }
      else if (cellStates[g_bot.x][g_bot.y] === 0){
          countdown = 0;
      }
      mode = 2;
      break;
    default : // Continue Straight
      countdown--;
      if (countdown < 0) {
        mode = 0;
        countdown = 0;
      }
  }

  // Move function implemented into fsm
  switch(dir) {
    case 0:
      dy = -1;
      break;
    case 1:
      dx - 1;
      break;
    case 2:
      dy = 1;
      break;
    case 3:
      dx = -1;
      break;
  }

  position[g_bot.x][g_bot.y] = (position[g_bot.x][g_bot.y] + 1) % colors.length;
  let x = (dx + g_bot.x + g_box.wid) % g_box.wid;
  let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt;

  g_bot.x = x;
  g_bot.y = y;
  g_bot.dir = dir;
}

// class Ant {
//   constructor(x, y, state, nose, counter) {
//     this.x = x;
//     this.y = y;
//     this.state = state;
//     this.nose = nose;
//     this.counter = counter;
//     this.adj_mat = [[0, 1], [1, 0]];
//   }

  // fsm (action) {
  //   let col;
    
  //   switch (this.state) {
  //     case 0 : { // Normal Mode
  //       col = 0;
  //       // if (action == 0 || action == 1) { // L/R Action
  //       //   this.counter = board.get_color('@' + this.x + this.y);
  //       //   switch (action) {
  //       //     case 0 : ant.nose = ++ant.nose % 4; break;
  //       //     case 1 : ant.nose = (ant.nose == 0 ? 3 : ant.nose - 1);
  //       //   }
  //       //   console.log('Going ' + (action == 0 ? 'Left' : 'Right'));
  //       // } else { // Countdown-Straight Action
  //       //   col = 1;
  //       //   console.log('Going to Countdown Mode');
  //       // }
  //       break;
  //     }
  //     case 1 : { // Countdown-Straight Mode
  //       if (this.counter < 0) {
  //         col = 1;
  //         console.log('Going to Normal Mode');
  //       } else {
  //         col = 0;
  //         this.counter--;
  //         console.log(this.counter + 1 + ' left')
  //       }
  //     }
  //   }

  //   this.state = this.adj_mat[this.state][col];
  // }

//   move() {
//     let dx = this.x;
//     let dy = this.y;
//     let size = board.cell;
//     let max_width = board.width * size;
//     let max_height = board.height * size;

//     switch (nose[ant.nose]) {
//       case 'N' : { dy = (dy == 0 ? max_height : dy) - size; break; } // cell index height = [0, 390]
//       case 'E' : { dx = (dx + size) % max_width;  break; }           // example: (590 + 10) % 600 = 0
//       case 'S' : { dy = (dy + size) % max_height; break; }           // example: (390 + 10) % 400 = 0
//       case 'W' : { dx = (dx == 0 ? max_width : dx) - size; break; }  // cell index width = [0, 590]
//     }

//     this.x = dx; // move ant in x-dir
//     this.y = dy; // move ant in y-dir
//   }
// }

// var board = new Board(10, 60, 40);
// var ant = new Ant(300, 200, 0, 0, 0);

// var YOU_PRESSED_THE_RIGHT_ARROW_KEY = false;
// keyPressed = () => {
//   if (keyCode === RIGHT_ARROW) {
//     YOU_PRESSED_THE_RIGHT_ARROW_KEY = true;
//   }
// }

// function setup() {
//   createCanvas(board.cell * board.width, board.cell * board.height);
//   stroke('white');
// }

function draw_bot() { //prof code mostly
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1+ g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1+ g_bot.y*sz;
    let big = sz -2; // Stay inside cell walls.
    // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.
    // fill( "#" + g_bot.color ); // Concat string, auto-convert the number to string.
    fill(colors[position[g_bot.x][g_bot.y]] ); // Concat string, auto-convert the number to string.
    // console.log( "x,y,big = " + x + "," + y + "," + big );
    let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
    let pix = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ];
    // console.log( "acolors,pix = " + acolors + ", " + pix );

    // Paint the cell.
    rect(x, y, big, big);
}

function draw_update() {
  antFSM();
  draw_bot();
}

function draw() { // prof code
  ++g_frame_cnt;
  if (0 == g_frame_cnt % g_frame_mod) {
    if (!g_stop) draw_update();
  }
//  if (YOU_PRESSED_THE_RIGHT_ARROW_KEY) {
  //  if (frameCount % 24 === 0) {
      // ant.fsm(action[board.get_color('@' + ant.x + ant.y)]);
      // board.increment_color();
      // ant.move();
  //  }
//  }
//  YOU_PRESSED_THE_RIGHT_ARROW_KEY = false;
}

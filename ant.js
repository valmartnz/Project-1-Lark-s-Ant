/*
  Authors:
    Valerie Martinez
    Anthony Sanchez
    Bradley Diep
    Jason Duong

  Description:
    The brain/logic of the ant
*/

var c_index = 0; // color index
var f_index = 0; // face index
var ant_canvas = { cell: 10, width: 60, height: 40 };
var ant_action = [0, 1, 2, 1];
var ant_bot = { x: 300, y: 200, face: ['N', 'E', 'S', 'W'], state: 0, counter: 0, color: ['#FFFFFF', '#89CFF0', '#FFF300', '#FF6347']};

// start pos = (300, 200)
// face = North, East, South, West
// array of colors { Black, Blue, Yellow, Red }

function setup() {
  createCanvas(ant_canvas.cell * ant_canvas.width, ant_canvas.cell * ant_canvas.height);

}

function fsm(action) {
  switch (ant_bot.state) {
    case 0 : { // Normal Mode
      if (action == 0 || action == 1) {
        ant_bot.counter = c_index;
        f_index = (action == 0 ? f_index + 1 : f_index - 1); // Left = increment | Right = decrement
      } else {
        ant_bot.state = 1;
      }
      break;
    }
    case 1 : { // Countdown Mode
      if (ant_bot.counter < 0) { ant_bot.state = 0; }
      else { ant_bot.counter--; }
    }
  }
}

function get_color(dx, dy, size, max_width) {
    loadPixels();
    let offset = ((dx * size) + (dy * size)) * max_width * 4;
    console.log("rgb("+ pixels[offset] + ", " + pixels[offset+1] + ', ' + pixels[offset+2] + ")"); // RGB
    updatePixels();
}

function draw() {
//  if (frameCount % 50 === 0) {
//    fsm(/* get current cell color */);

    let dx = ant_bot.x;
    let dy = ant_bot.y;
    let size = ant_canvas.cell;
    let max_width = size * ant_canvas.width;
    let max_height = size * ant_canvas.height;

    move_ant(dx, dy, size, max_width, max_height);
    get_color(dx, dy, size, max_width);

    // color the current cell
    rect(ant_bot.x, ant_bot.y, ant_canvas.cell, ant_canvas.cell);
    fill(ant_bot.color[c_index]);
//  }
}

function move_ant(dx, dy, size, max_width, max_height) {
    // test movement with random face index
    f_index = Math.floor(Math.random() * 4);

    // each cell is 10px
    switch (ant_bot.face[f_index]) {
      case 'N' : { dy = (dy == 0 ? max_height : dy - size); break; }
      case 'E' : { dx = (dx + size) % max_width;  break; }  // example: (600 + 10) % 600 = 10
      case 'S' : { dy = (dy + size) % max_height; break; }  // example: (400 + 10) % 400 = 10
      case 'W' : { dx = (dx == 0 ? max_width : dx - size); break; }
    }

    ant_bot.x = dx; // move ant in x-dir
    ant_bot.y = dy; // move ant in y-dir
    c_index = ++c_index % 4; // increment color index with wrap-around
}
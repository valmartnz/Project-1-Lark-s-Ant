/*
  Authors:
    Valerie Martinez
    Anthony Sanchez
    Bradley Diep
    Jason Duong

  Description:
    The brain/logic of the ant
*/

var i = 0; // color index
var f = 0; // face index
var ant_canvas = { cell: 10, width: 60, height: 40 };
var ant_bot = { x: 300, y: 200, face: ['E', 'W', 'N', 'S'], state: 0, counter: 0, color: ['#000000', '#89CFF0', '#FFF300', '#FF6347']};

// start pos = (300, 200)
// face = East, West, North, South
// array of colors { black, blue, yellow, red }

var ant_action = [0, 1, 2, 1];

function setup() {
  createCanvas(ant_canvas.cell * ant_canvas.width, ant_canvas.cell * ant_canvas.height);
  fsm(ant_action[i]);
  draw();
}

function fsm(action) {
  switch (ant_bot.state) {
    case 0 : { // Normal Mode
      if (action == 0 || action == 1) {
        ant_bot.counter = i;
        f = action;
//        console.log(ant_bot);
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

function draw() {
  // test draw

  let dx = ant_bot.x;
  let dy = ant_bot.y;
  let size = ant_canvas.cell;
  let max_width = size * ant_canvas.width;
  let max_height = size * ant_canvas.height;

  switch (ant_bot.face[f]) {
    case 'N' : { dy = (dy - size) % max_height; break; }
    case 'E' : { dx = (dx + size) % max_width; break; }
    case 'S' : { dx = (dx + size) % max_width; break; }
    case 'W' : { dy = (dy - size) % max_height; break; }
  }

  ant_bot.x = dx;
  ant_bot.y = dy;
  i = ++i % 4; // increment color index with wrap-around

  rect(ant_bot.x, ant_bot.y, ant_canvas.cell, ant_canvas.cell);
  fill(ant_bot.color[i]);
}
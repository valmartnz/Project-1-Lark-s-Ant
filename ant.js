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
var ant_bot = { x: 300, y: 200, state: 0, counter: 0, color: ['#000000', '#89CFF0', '#FFF300', '#FF6347'], face: ['N', 'E', 'S', 'W'], action: [0, 1, 2, 1]};

// start pos = (300, 200)
// face = North, East, South, West
// array of colors { Black, Blue, Yellow, Red }

function setup() {
  createCanvas(ant_canvas.cell * ant_canvas.width, ant_canvas.cell * ant_canvas.height);
  board(10, 50, 'white', 'black'); // COPIED CODE FROM PROFESSOR
}

function fsm(action) {
  switch (ant_bot.state) {
    case 0 : { // Normal Mode
      if (action == 0 || action == 1) {
        ant_bot.counter = c_index;
        switch (action) {
          case 0 : ++f_index % 4; break;
          case 1 : (f_index == 0 ? 3 : --f_index);
        }
      } else {
        ant_bot.state = 1;
      }
      break;
    }
    case 1 : { // Countdown-Straight Mode
      if (ant_bot.counter < 0) { ant_bot.state = 0; }
      else { ant_bot.counter--; }
    }
  }
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

function draw() {
  if (frameCount % 50 === 0) { // slows down animation
    move_ant();

    // TODO:
    // Assumptions:
    //    get_color()       returns a hex color code => '#??????'
    //    array.indexOf()   returns the index of a value in an array
    //
    // Example:
    //    get_color() = '#FFFFFF' = Black
    //    c.indexOf(get_color()) = 0
    //    ++c.indexOf(get_color()) % 4 = (0 + 1) % 4 = 1 
    //    c[(++c.indexOf(get_color())) % 4] = c[1] = Blue
    // 
    // Implementation:
    //    let t = ant_bot.color;
    //    let inc = (++t.indexOf(get_color())) % 4;
    //    fill(ant_bot.color[inc]);

    fill(ant_bot.color[c_index]); /***REPLACE THIS WHEN DONE***/
    rect(ant_bot.x, ant_bot.y, ant_canvas.cell, ant_canvas.cell);
  }
}

function move_ant() {
    let dx = ant_bot.x;
    let dy = ant_bot.y;
    let size = ant_canvas.cell;
    let max_width = size * ant_canvas.width;
    let max_height = size * ant_canvas.height;

    get_color(dx, dy, size, max_width);

    // test movement with recognition of current cell color
    fsm(ant_bot.action[Math.floor(Math.random() * 4)]);

    // each cell is 10px
    switch (ant_bot.face[f_index]) {
      case 'N' : { dy = (dy == 0 ? max_height : dy - size); break; }
      case 'E' : { dx = (dx + size) % max_width;  break; }  // example: (600 + 10) % 600 = 10
      case 'S' : { dy = (dy + size) % max_height; break; }  // example: (400 + 10) % 400 = 10
      case 'W' : { dx = (dx == 0 ? max_width : dx - size); break; }
    }

    ant_bot.x = dx; // move ant in x-dir
    ant_bot.y = dy; // move ant in y-dir

    c_index = ++c_index % 4; /***REMOVE THIS WHEN DONE***/
}
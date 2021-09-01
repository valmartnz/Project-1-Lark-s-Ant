// this is a test
// yo hey 
// anthony testing gitpush
//another test


// Make our own global, g_canvas, JS 'object': a key-value 'dictionary'.
  // (Our g_canvas is just a suitcase - the P5 canvas has the pixels, themselves.)
  var g_canvas = { cell_size:10, wid:64, hgt:48 }; // JS Global var, w canvas size info.
  var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
  var g_frame_mod = 24; // Update ever 'mod' frames.
  var g_stop = 0; // Go by default.
  
  function setup() // P5 Setup Fcn, must be called for Anim to work.
  {
      let sz = g_canvas.cell_size;
      let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
      let height = sz * g_canvas.hgt;
      createCanvas( width, height );  // Make a P5 canvas.
      draw_grid( 10, 50, 'white', 'yellow' ); // Calls fcn in another (loaded) file.
  }
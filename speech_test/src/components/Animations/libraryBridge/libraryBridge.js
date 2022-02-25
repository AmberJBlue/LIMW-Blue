/**
TO DO LIST
- move to pool size
- change typography
- have it automatically go to the next line on text input length
- zoom animation, camera moving
**/


let time = 0;
var img; // for the UV Grid (used to map the image to the sphere)

// Overall main output canvas size
let canvasWidth = 3840;
let canvasHeight = 2160;

// Pool dimensions
let poolWidth = 3072;
let poolHeight = 1280;

// (cameraX, cameraY, cameraZ) dictate position of the camera
let cameraX = 0;
let cameraY = 0;
let cameraZ = 100;

// (centerX, centerY, centerZ) dictate position the camera is pointed towards
let centerX = 0;
let centerY = 0;
let centerZ = 0;

function preload() {
  img = loadImage('UV_Grid_Sm.jpg');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  pg = createGraphics(800, 800); // rectangle that will be mapped onto sphere
  pg.textSize(40); // size of text
  
  textBuffer = '\n';
  
  let fov = 60.0;  // 60 degrees FOV
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}

function keyTyped() {
  textBuffer += key;
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    textBuffer = textBuffer.slice(0, -1);
  } else if (keyCode === ENTER) {
    textBuffer += "\n";
  }
}

function draw() {
  background(0);
  
  // set the virtual camera position
  camera(cameraX, cameraY, cameraZ, centerX, centerY, centerZ, 0, 1, 0);
  
  // include some light even in shadows
  ambientLight(100, 100, 100);
  
  let centerAxis = createVector(0, 1, 0);
  
  //pg.background(200);
  pg.fill(255);
  pg.text(textBuffer, -4, 0);

  //pass image as texture
  texture(pg);
  noStroke();
  
  push();
  rotate(0.25 * time, centerAxis);
  sphere(40);
  pop();
  
  /**
  if (time <= 20) {
  } else (time <= 30) {
  } else (time <= 40) {
  } else (time <= 50) {
  } else {
  }
  **/
  
  time += 0.03;  // update the time
  
}

// sketch.js - purpose and description here
// Author: Gabe Ahrens
// Date: 1/27/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
// Globals
let myInstance;
let canvasContainer;
let centerHorz;
let centerVert;

let occupied;
let reference;
let mouse;
let pmouse;
let mouseV;

class Particle {
  constructor(x, y, clr) {
    this.location = createVector(x, y);
    this.velocity = createVector();
    this.impatience = 0;
    this.clr = clr;
    occupied[x][y] = true;
    reference[x][y] = this;
  }

  update() {
    let px = round(this.location.x);
    let py = round(this.location.y);
    let newLoc = p5.Vector.add(this.location, this.velocity);
    let nx = round(newLoc.x);
    let ny = round(newLoc.y);

    if ((px !== nx || py !== ny)) {
      if (nx < 0 || nx >= width) {
        this.velocity.x *= -0.5;
      } else if (ny < 0 || ny >= height) {
        this.velocity.y *= -0.5;
      } else {
        if (occupied[nx][ny]) {
          let delta = p5.Vector.sub(reference[nx][ny].velocity, this.velocity);
          delta.mult(0.8);
          let heat = this.impatience / 3.0;
          delta.add(createVector(random(-heat, heat), random(-heat, heat)));
          this.velocity.add(delta);
          reference[nx][ny].velocity.sub(delta);
          this.impatience++;
          //if (this.impatience > 4) { this.impatience = 4; }
					if (this.impatience > 2) { this.impatience = 2; }
        } else {
          occupied[px][py] = false;
          occupied[nx][ny] = true;
          reference[nx][ny] = this;
          this.location = newLoc;
          this.impatience = 0;
        }
      }
    }

    if (mouseIsPressed) {
      let arm = p5.Vector.sub(mouse, this.location);
      let rad = 64;
      if (arm.mag() < rad) {
        let delta = p5.Vector.sub(mouseV, this.velocity);
        delta.mult((1 - arm.mag() / rad) * 0.5);
        this.velocity.add(delta);
      }
    }

    this.velocity.y += 0.1;
  }
}

let field;

function preload() {
	img = loadImage('./images/img.jpg');
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(round(canvasContainer.width()), round(canvasContainer.height()));
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  //noiseSeed(random()*Number.MAX_SAFE_INTEGER);

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  //createCanvas(400, 400);
  occupied = new Array(width).fill().map(() => new Array(height).fill(false));
  reference = new Array(width).fill().map(() => new Array(height).fill(null));

	
	img.resize(150, 150);
  //let boxSize = 150;
  //field = new Array(boxSize * boxSize);
	field = new Array(img.width * img.height);

  for (let i = 0; i < field.length; i++) {
    let x = width / 2 - img.width / 2 + i % img.width;
    let y = (1.5 * height / 2) - img.width / 2 + Math.floor(i / img.width);
    //field[i] = new Particle(x, y, color(random(255), random(255), random(255)));
		cArray = img.get(i % img.width, i / img.width);
		field[i] = new Particle(x, y, color(cArray[0], cArray[1], cArray[2]));
  }
}

function draw() {
  background(0);
	//clear(); // Clears the canvas
  
  pmouse = createVector(pmouseX, pmouseY);
  mouse = createVector(mouseX, mouseY);
  mouseV = p5.Vector.sub(mouse, pmouse);

  loadPixels(); // Loads the current pixel array into memory

  for (let i = 0; i < field.length; i++) {
    field[i].update();
    let x = round(field[i].location.x);
    let y = round(field[i].location.y);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      let index = (x + y * width) * 4;
      let col = field[i].clr.levels;
      pixels[index + 0] = col[0]; // Red
      pixels[index + 1] = col[1]; // Green
      pixels[index + 2] = col[2]; // Blue
      pixels[index + 3] = 255;    // Alpha
    }
  }

  updatePixels(); // Updates the pixels array with the new color values
}


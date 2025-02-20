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

const n = 4;
let sCount = 0;


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
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  //noiseSeed(random()*Number.MAX_SAFE_INTEGER);

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  stars = [];
}

function draw() {
  colorMode(RGB);
  //background('rgb(142,209,231)');
  background(142 - ((floor(frameCount/60 * 255)) * 0.015), (255 - ((floor(frameCount/60 * 255)) * 0.02)), (231 - ((floor(frameCount/60 * 255)) * 0.012)));
  blendMode(BLEND);
  
  let t = (millis() / 40000) % 1;
  colorMode (HSL, 1);
  directionalLight(color(t,0.8,0.8), 1,0,0);
  directionalLight(color((t+1/4)%1,0.8,0.8), 0,1,0);
  directionalLight(color((t+2/4)%1,0.8,0.8), 0,0,1);
  ortho();
  fill(255);
  camera(-n * 100, -n * 100, -n * 100);
  
  let time = millis() / 1000; // remember to reset to 1000
  
  if (time > 80 && (frameCount % 15 == 0) && sCount <= 75)
  {
    // create a new star
    stars.push(new Star(floor(random(-1500, 1500)), floor(random(-1500, 1500)), floor(random(50, 400)), floor(random(1,5))));
    sCount++;
    //console.log("added a star");
  }
  
  for (let i = 0; i < sCount; i++)
  {
      //sphere(stars[i].x, stars[i].y, 20);
      push();
      noStroke();
      blendMode(SCREEN);
      translate(stars[i].x, stars[i].y, stars[i].z);
      sphere(stars[i].size);
      pop();
  }
  
  push();
  //rotate(millis());
  //console.log("test");
  
  

  translate(0, 100 + time * 50, 0);

  noStroke();
  //fill('lightgray');
  translate(0, -1000, 0);
  cloud1(-400, 75);
  translate(0, -250, 0);
  cloud2(300, -75);
  translate(0, -250, 0);
  cloud3(250, 250);
  translate(0, -250, 0);
  cloud4(-250, -125);
  translate(0, -250, 0);
  cloud2(400, -125);
  translate(0, -250, 0);
  cloud1(-600, 125);
  translate(0, -250, 0);
  cloud3(-250, -400);
  translate(0, -250, 0);
  cloud2(-400, -75);
  translate(0, -250, 0);
  cloud4(300, 125);
  translate(0, -125, 0);
  cloud1(125, -75);
  translate(0, -125, 0);
  cloud3(300, -125);
  translate(0, 3250, 0);

  stroke(0);
  fill(255);

  //box(100, 100 + (millis()/100)%1000, 100);
  box(100, 100 + time * 100, 100);
  translate(200, 0, -100);
  box(75, 100 + time * 100, 75);
  translate(-200, 0, 100);
  translate(200, 0, 0);
  box(75, 100 + time * 100, 75);
  translate(15, 0, -15);
  box(25, 125 + time * 100, 25);
  translate(2, 0, -2);
  box(10, 155 + time * 100, 10);
  pop();
}


function cloud1(offsetx, offsetz)
{
	push();
	translate(offsetx, 0, offsetz);
	sphere(25);
	translate(-10, 5, 30);
	sphere(30);
	translate(-15, 10, 30);
	sphere(20);
	pop();
}

function cloud2(offsetx, offsetz)
{
	push();
	translate(offsetx, 0, offsetz);
	sphere(25);
	translate(10, 5, -25);
	sphere(20);
	translate(-35, -5, 35);
	sphere(15);
	pop();
}

function cloud3(offsetx, offsetz)
{
	push();
	translate(offsetx, 0, offsetz);
	sphere(25);
	translate(-20, 5, 25);
	sphere(15);
	translate(45, -5, -35);
	sphere(20);
	pop();
}

function cloud4(offsetx, offsetz)
{
	push();
	translate(offsetx, 0, offsetz);
	sphere(20);
	translate(10, 0, -25);
	sphere(15);
	translate(-25, 5, 35);
	sphere(15);
	pop();
}

class Star {
	constructor(x, y, z, s)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.size = s;
	}
}


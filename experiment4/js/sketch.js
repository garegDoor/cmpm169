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
var centerHorz, centerVert;

const iniVel = 4;
const velRate = 2;
const radRate = 1;
const iniRad = 35;
const spinSpeed = 0.5;

let particles = [];



function addParticle(x, y, r, v)
{
				//var c = color(random(0,255), random(0,255), random(0,255));
        particles[particles.length] = new particle(x, y, r, v);
}

function mousePressed()
{
        addParticle(0, 0, iniRad, iniVel);
}

function mouseDragged()
{
        addParticle(0, 0, iniRad, iniVel);
				//addParticle();
				//addParticle();
}

class particle {
     constructor(x, y, r, v) {
         this.pos = createVector(x, y);
         //this.velX = random(-iniVel, iniVel);
         //this.velY = random(-iniVel, iniVel);
			 	 this.velX = random(-v, v);
			   this.velY = random(-v, v);
         this.color = color(random(0,255), random(0,255), random(0,255));
         this.radius = r;
     }
    
     age() {
         if (this.pos.x > width/2)
         {
              this.velX += random(-velRate, 0);
         }
         else
         {
              this.velX += random(0, velRate); 
         }
         
         if (this.pos.y > height/2)
         {
              this.velY += random(-velRate, 0);
         }
         else
         {
              this.velY += random(0, velRate); 
         }
         
         // this.velX += random(-velRate, velRate);
         // this.velY += random(-velRate, velRate);
         
         this.pos.x = this.pos.x + this.velX;
         this.pos.y = this.pos.y + this.velY;
         this.radius -= radRate;
     }
     
     display() {
         fill(this.color);
         if (this.radius > 0)
             //rect(this.pos.x, this.pos.y, this.radius, this.radius);
            ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
     }
	
}


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  noiseSeed(random()*Number.MAX_SAFE_INTEGER);

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  noStroke();
  background(220);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(255, 0.51);
		
		push();
		translate(mouseX, mouseY);
		let angle = frameCount * spinSpeed/TWO_PI;
		rotate(angle);
		particles.forEach(p => {
            p.age();
            p.display();
            
        }
    )
		pop();
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
   console.log('added new particle');
   particles.push(new particle(mouseX, mouseY));
}
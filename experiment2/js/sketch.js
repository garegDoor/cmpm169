// sketch.js - purpose and description here
// Author: Gabe Ahrens
// Date: 1/22/25
// This is the sketch.js file for Experiment 2 for CMPM 169 Winter 2025.
// A large portion of the code was taken from the program Pallas by Roys on openprocessing.
// I modified the particle system in that program to instead produce colorful changing and moving shapes on screen.

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

var mass = [];
var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];
var positionX2, positionY2;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }

    // This is a method that is a modified version of the draw from Pallas by Roys on openprocessing, which was the inspiration & starting point for this experiment
    myDraw() {
        background(32);
    
        for (var particleA = 0; particleA < mass.length; particleA++) {
            var accelerationX = 0, accelerationY = 0;
            
            for (var particleB = 0; particleB < mass.length; particleB++) {
                if (particleA != particleB) {
                    var distanceX = positionX[particleB] - positionX[particleA];
                    var distanceY = positionY[particleB] - positionY[particleA];

                    var distance = sqrt(distanceX * distanceX + distanceY * distanceY);
                    if (distance < 1) distance = 1;

                    var force = (distance - 320) * mass[particleB] / distance;
                    accelerationX += force * distanceX;
                    accelerationY += force * distanceY;
                }
            }
            
            velocityX[particleA] = velocityX[particleA] * 0.99 + accelerationX * mass[particleA];
            velocityY[particleA] = velocityY[particleA] * 0.99 + accelerationY * mass[particleA];
        }
        
        for (var particle = 0; particle < mass.length; particle++) {
            positionX[particle] += velocityX[particle];
            positionY[particle] += velocityY[particle];
            
            if (particle != 0)
            {
                positionX2 = positionX[particle - 1];
                positionY2 = positionY[particle - 1];
            }
            else
            {
                positionX2 = positionX[particle];
                positionY2 = positionY[particle];
            }
            
            fill(((positionX[particle] * 255/width)/2) + (sin(frameCount * 0.005) * 255/2), (((positionY[particle] * 255/height)/2) + (cos(frameCount * 0.005) * 255)/2), ((sin(frameCount * 0.005) * 255)/2 + (cos(frameCount * 0.005) * 255)/2));
            beginShape();
            vertex(positionX[particle], positionY[particle]);
            vertex(positionX2, positionY2);
            vertex(centerHorz, centerVert);
            endShape(CLOSE);
        }
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

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);    
  // call a method on the instance
  myInstance.myMethod();

  // My code for creating the shape art
  myInstance.myDraw();

  // // Set up rotation for the rectangle
  // push(); // Save the current drawing context
  // translate(centerHorz, centerVert); // Move the origin to the rectangle's center
  // rotate(frameCount / 100.0); // Rotate by frameCount to animate the rotation
  // fill(234, 31, 81);
  // noStroke();
  // rect(-125, -125, 250, 250); // Draw the rectangle centered on the new origin
  // pop(); // Restore the original drawing context

  // The text is not affected by the translate and rotate
  fill(255);
  textStyle(BOLD);
  textSize(140);
  text("Click Me", centerHorz - 105, centerVert + 40);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

// The code for the following 3 functions was taken from Pallas by Roys on openprocessing

/////////////////////////////////////////////////////////////////////////////////////////////////////

function addNewParticle() {
    mass.push(random(0.003, 0.03));
    positionX.push(mouseX);
    positionY.push(mouseY);
    velocityX.push(0);
    velocityY.push(0);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function mouseClicked() {
    addNewParticle();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function mouseDragged() {
    addNewParticle();
}


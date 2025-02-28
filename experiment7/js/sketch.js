// sketch.js - purpose and description here
// Author: Gabe Ahrens
// Date: 2/20/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
// Globals
let myInstance;
let canvasContainer;
let centerHorz;
let centerVert;

// brown, buff, cinnammon, gray, green, pink, purple, red, white, yellow, blue, orange, black
let colors = ['rgb(130, 75, 0)', 'rgb(240, 220, 130)', 'rgb(210, 105, 30)', 'rgb(128, 128, 128)', 'rgb(99,159,99)', 'rgb(255, 182, 193)', 'rgb(197,136,236)', 'rgb(213,57,57)', 'rgb(244,244,244)', 'rgb(251,251,138)', 'rgb(70, 70, 255)', 'rgb(255, 165, 0)', 'rgb(0, 0, 0)'];
let capColor;
let stemColor;
let capW;
let stemW;
let stemH;
let poison;


let mushroomData;
let mushroomString;
let mushroomStats;
let mushroom;

class Mushroom 
{
	constructor(mName, capWidth, capColorIdx, stemWidth, stemHeight, stemColorIdx, poisonous)
	{
		this.name = mName;

		this.cWidth = capWidth * 10;
		this.cHeight = capWidth * 5;
		this.cColor = capColorIdx;
		
		this.sWidth = stemWidth;
		this.sHeight = stemHeight * 10;
		this.sColor = stemColorIdx;
		
		this.poison = poisonous;
	}

	render()
	{
		
		noStroke();
		fill(colors[this.sColor]);
		rect(-this.sWidth/2, -this.sHeight, this.sWidth, this.sHeight);
		fill(colors[this.cColor]);
		translate(0, -this.sHeight);
		ellipse(0, 0, this.cWidth, this.cHeight);
	}
}

function preload()
{
	mushroomData = loadStrings('./data/mushrooms.csv');
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

	background(220);
	strokeWeight(3);


	//m = new Mushroom('f', 20, 10, 4, 5, 15, true);

	// Guessing buttons
	let edible = createButton('Edible');
	let poisonous = createButton('Poisonous');

	edible.position(width/4, height * 0.8);
	poisonous.position(3 * width/4, height * 0.8);

	edible.mousePressed(guessE);
	poisonous.mousePressed(guessP);

	
	mushroomString = random(mushroomData);

	while (mushroomString == mushroomData[0]) // ensures that we don't accidently use the first line which is just labels
		mushroomString = random(mushroomData);

	mushroomStats = split(mushroomString, ';');

	console.log(mushroomStats); // 1 - name, 2 - poisonous, 3 - cap diameter, 6 - cap color, 11 - stem height, 12 - stem width, 15 - stem color


	//let mcapC = mushroomStats[6].substring(1, 2);
	let mcapC = mushroomStats[6].substring(1, mushroomStats[6].length - 1).split(', ');
	console.log(mcapC);
	mcapC = random(mcapC);
	console.log(mcapC);

	switch (mcapC)
	{
		case 'n':
			capColor = 0;
			break;
		
		case 'b':
			capColor = 1;
			break;

		case 'c':
			capColor = 2;
			break;

		case 'g':
			capColor = 3;
			break;

		case 'r':
			capColor = 4;
			break;

		case 'p':
			capColor = 5;
			break;

		case 'u':
			capColor = 6;
			break;

		case 'e':
			capColor = 7;
			break;
		
		case 'w':
			capColor = 8;
			break;

		case 'y':
			capColor = 9;
			break;

		case 'l':
			capColor = 10;
			break;

		case 'o':
			capColor = 11;
			break;

		case 'k':
			capColor = 12;
			break;

		case 'f':
			capColor = 6;
			break;

		default:
			console.log("Setup Error: cap color default case");
			break;
	}

	console.log("Cap Color idx: " + capColor);

	let mstemC = mushroomStats[15].substring(1, mushroomStats[15].length - 1).split(', ');
	console.log(mstemC);
	mstemC = random(mstemC);
	console.log(mstemC);

	switch (mstemC)
	{
		case 'n':
			stemColor = 0;
			break;
		
		case 'b':
			stemColor = 1;
			break;

		case 'c':
			stemColor = 2;
			break;

		case 'g':
			stemColor = 3;
			break;

		case 'r':
			stemColor = 4;
			break;

		case 'p':
			stemColor = 5;
			break;

		case 'u':
			stemColor = 6;
			break;

		case 'e':
			stemColor = 7;
			break;
		
		case 'w':
			stemColor = 8;
			break;

		case 'y':
			stemColor = 9;
			break;

		case 'l':
			stemColor = 10;
			break;

		case 'o':
			stemColor = 11;
			break;

		case 'k':
			stemColor = 12;
			break;

		case 'f':
			stemColor = 6;
			break;

		default:
			console.log("Setup Error: stem color default case");
			break;
	}

	console.log("Stem Color idx: " + stemColor);

	capW = mushroomStats[3].substring(1, mushroomStats[3].length - 1).split(', ');
	console.log(capW);
	capW = random(int(capW[0]), int(capW[1]));
	console.log(capW);

	stemH = mushroomStats[11].substring(1, mushroomStats[11].length - 1).split(', ');
	console.log(stemH);
	stemH = random(int(stemH[0]), int(stemH[1]));
	console.log(stemH);

	stemW = mushroomStats[12].substring(1, mushroomStats[12].length - 1).split(', ');
	console.log(stemW);
	stemW = random(int(stemW[0]), int(stemW[1]));
	console.log(stemW);

	console.log(mushroomStats[2]);
	if (mushroomStats[2] == "e")
	{
		poison = false;
	}
	else if (mushroomStats[2] == "p")
	{
		poison = true;
	}
	else
	{
		console.log("Setup Error: poison value neither p nor e");
	}

	mushroom = new Mushroom(mushroomStats[1], capW, capColor, stemW, stemH, stemColor, poison);
}

function draw() {
	push();
	translate(width/2, height * 0.8);
	//m.render();
	mushroom.render();
	pop();
}

function guessE() {
	console.log("Guessed Edible");
	if (mushroom.poison == false)
	{
		// guessed right
		text('You guessed right, its edible!', width/2 - 80, height * 0.1);
	}
	else
	{
		// guessed wrong
		text('You guessed wrong, its poisonous!', width/2 - 85, height * 0.1);
	}

	text("Mushroom Name: " + mushroom.name, width/2 - 85, height * 0.9);
}

function guessP() {
	console.log("Guessed Poisonous");
	if (mushroom.poison == true)
	{
		// guessed right
		text('You guessed right, its poisonous!', width/2 - 85, height * 0.1);
	}
	else
	{
		// guessed wrong
		text('You guessed wrong, its edible!', width/2 - 80, height * 0.1);
	}

	text("Mushroom Name: " + mushroom.name, width/2 - 85, height * 0.9);
}
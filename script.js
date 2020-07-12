/* global createCanvas,drawTouchPrompt,loadFont,textAlign, translate, displayBrushSize, rotate, noStroke, ellipse, fill, cursor, saveCanvas, strokeWeight, stroke, sq, windowWidth, line, windowHeight, colorMode, HSB,pmouseX, pmouseY background loadImage image resizeCanvas get mouseX, mouseY*/

//default values
let imgDimensions = { w: 570, h: 450 };
let imgUrl = Math.floor(Math.random() * 10);
let defaultPaintings = [
  "https://cdn.glitch.com/ed00bc65-49f7-4b45-ad53-f1dcea7aba31%2Fil_570xN.1424060518_k0dd.jpg?v=1594424247188"
];

imgUrl =
  "https://cdn.glitch.com/ed00bc65-49f7-4b45-ad53-f1dcea7aba31%2Fil_570xN.1424060518_k0dd.jpg?v=1594424247188";

let canvas,
  display,
  pixel,
  jost,
  isPainting = false,
  notStarted = true,
  brushWeight = 30,
  lastColor = [128, 128, 128, 20];

function preload() {
  display = loadImage(imgUrl);
  jost = loadFont('https://cdn.glitch.com/78391c90-30ed-44d7-8ca3-ccd51ddd2e05%2FJost-VariableFont_wght.ttf?v=1594528844941');
}

function setup() {
  if (windowWidth < 570) {
    //mobile device responsiveness for default img
    imgDimensions.h = (windowWidth - 50) * (imgDimensions.h / imgDimensions.w);
    imgDimensions.w = windowWidth - 50;
  }

  canvas = createCanvas(imgDimensions.w, imgDimensions.h);
  canvas.parent("canvas-div");
  background(235);
  
  brushWeight = Math.floor(windowWidth/15)
  displayBrushSize();
  noStroke();
}

function draw() {
  if (isPainting && pmouseX != mouseX && pmouseY != mouseY) {
    revealColor();
  }
  if (notStarted){
    drawTouchPrompt();
  }
}

//updates dimensions and returns a Promise after image finishes loading
function getDimensions(url) {
  let image = new Image();
  image.src = url;
  return new Promise((resolve, reject) => {
    image.onload = function() {
      imgDimensions.w = this.width;
      imgDimensions.h = this.height;
      adjustCanvas();
      document.getElementById("error-display").innerHTML = "";
      resolve();
    };
  });
}


function revealColor() {
  display.resize(imgDimensions.w, imgDimensions.h)
  pixel = display.get(mouseX, mouseY);
  pixel = averageColor(pixel, lastColor);
  pixel[3] = 12; //sets alpha to low value for watercolor effect
  fill(pixel);
  
  let brushTemp = brushWeight;
  let brushFrac = brushTemp / 20;
  let speedTransform = calcSpeedTransform();
  let rotation = Math.atan2(mouseY - pmouseY, mouseX - pmouseX);
  let mainAxis, crossAxis;
  
  translate(mouseX, mouseY);
  rotate(rotation);

  for (let i = 0; i < 15; i++) { //layering for watercolor effect
    mainAxis = Math.min(Math.max(brushTemp*speedTransform[0],5),brushTemp*2);
    crossAxis = Math.min(Math.max(brushTemp*speedTransform[1],0),brushTemp);
    ellipse(0, 0, mainAxis, crossAxis); 
    brushTemp -= brushFrac;
  }
  lastColor = pixel;
}


function calcSpeedTransform() {
  let yval = Math.max(mouseY - pmouseY, 0.5); //ensure no division by 0
  let xval = Math.max(mouseX - pmouseX, 0.5);
  let speed = Math.min(Math.max(Math.sqrt(sq(yval) + sq(xval)),1),40) ; //restricted between [1,40]
  if (speed>= 40){
    return [2, 0.5];
  }
  return [-10/(speed-40)+1, Math.max(10/(speed-40)+1, 1)];
}


function averageColor(color1, color2) {
  let avgColor = [];
  for (let i = 0; i < lastColor.length; i++) {
    avgColor[i] = Math.sqrt((sq(color1[i]) + sq(color2[i])) / 2);
  }
  return avgColor;
}

function adjustCanvas() {
  fitImage();
  resizeCanvas(imgDimensions.w, imgDimensions.h);
  background(235);
  document.getElementById("canvas-div").width =
    imgDimensions.w + "px";
  document.getElementById("canvas-div").height =
    imgDimensions.h - 100 + "px";
}

function fitImage(){
  let minPicDim = Math.min(imgDimensions.w, imgDimensions.h);
  let minWindowDim = Math.min(windowWidth, windowHeight;
  if (minDim == imgDimensions.w){ 
    imgDimensions.w = (minWindowDim - 100) * (imgDimensions.w / imgDimensions.h);
    imgDimensions.h = minWindowDim - 100;
  }
  else if (minDim == imgDimensions.h){
    imgDimensions.h = (minWindowDim - 100) * (imgDimensions.h / imgDimensions.w);
    imgDimensions.w = minWindowDim - 100;
  }
}

//prevents black lines when mouse moves off canvas
document
  .getElementById("canvas-div")
  .addEventListener("mouseenter", function() {
    isPainting = true;
    if(notStarted){
      notStarted = false;
      background(235);   
    }
  });
document.getElementById("canvas-div").addEventListener("mouseout", function() {
  isPainting = false;
});

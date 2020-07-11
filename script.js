/* global createCanvas, translate, rotate, noStroke, ellipse, fill, cursor, saveCanvas, strokeWeight, stroke, sq, windowWidth, line, windowHeight, colorMode, HSB,pmouseX, pmouseY background loadImage image resizeCanvas get mouseX, mouseY*/

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
  isPainting = false,
  brushWeight,
  lastColor = [128, 128, 128, 20];

function preload() {
  display = loadImage(imgUrl);
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
  brushWeight = imgDimensions.h/5;
  noStroke();
}

function draw() {
  if (isPainting && pmouseX != mouseX && pmouseY != mouseY) {
    revealColor();
  }
}

/*images take time to load, so this function returns a Promise that 
causes other functions to wait until it's done*/
function getDimensions(url) {
  let userImage = new Image();
  userImage.src = url;
  return new Promise((resolve, reject) => {
    userImage.onload = function() {
      imgDimensions.w = this.width;
      imgDimensions.h = this.height;
      adjustCanvas();
      document.getElementById("error-display").innerHTML = "";
      resolve();
    };
  });
}



function revealColor() {
  pixel = display.get(mouseX, mouseY);
  pixel = averageColor(pixel, lastColor);
  pixel[3] = 5; //sets alpha to low value for watercolor effect
  fill(pixel);
  
  let speedTransform = calcSpeedTransform();
  let rotation = Math.atan2(mouseY - pmouseY, mouseX - pmouseX);
  let brushTemp = brushWeight;
  let brushFrac = brushTemp / 25;
  
  translate(mouseX, mouseY);
  rotate(rotation);

  for (let i = 0; i < 15; i++) { //layering for watercolor effect
    ellipse(0, 0, brushTemp*speedTransform[0], brushTemp*speedTransform[1]/*cross axis*/); 
    brushTemp -= brushFrac;
  }

  lastColor = pixel;
}



function calcSpeedTransform() {
  let yval = Math.max(mouseY - pmouseY, 1);
  let xval = Math.max(mouseX - pmouseX, 1);
  let speedTransform = Math.sqrt(sq(yval) + sq(xval)) / 10;
  return [Math.min(-1/(speedTransform+0.5)+1, 2), Math.min(1/5*(speedTransform+0.5), 2)];
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
  document.getElementById("canvas-div").style =
    "width: " + imgDimensions.w + "px";
  document.getElementById("canvas-div").style =
    "height: " + imgDimensions.h - 100 + "px";
}

function fitImage() {}

//prevents black lines when mouse moves off canvas
document
  .getElementById("canvas-div")
  .addEventListener("mouseenter", function() {
    isPainting = true;
  });
document.getElementById("canvas-div").addEventListener("mouseout", function() {
  isPainting = false;
});

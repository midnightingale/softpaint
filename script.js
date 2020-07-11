/* global createCanvas, noStroke, ellipse, fill, cursor, saveCanvas, strokeWeight, stroke, sq, windowWidth, line, windowHeight, colorMode, HSB,pmouseX, pmouseY background loadImage image resizeCanvas get mouseX, mouseY*/

//default values
let imgDimensions = { w: 570, h: 450 };
let imgUrl = Math.floor(Math.random()*10)
let defaultPaintings = ["https://cdn.glitch.com/ed00bc65-49f7-4b45-ad53-f1dcea7aba31%2Fil_570xN.1424060518_k0dd.jpg?v=1594424247188"];
    
imgUrl=  "https://cdn.glitch.com/ed00bc65-49f7-4b45-ad53-f1dcea7aba31%2Fil_570xN.1424060518_k0dd.jpg?v=1594424247188";

let canvas,
  display,
  pixel,
  isPainting = false,
  brushWeight = 40,
  lastColor = [128, 128, 128, 20];

function preload() {
  display = loadImage(imgUrl);
}

function setup() {
  if(windowWidth<570){ //mobile device responsiveness for default img
    imgDimensions.h = (windowWidth-50)*(imgDimensions.h/imgDimensions.w);
    imgDimensions.w = windowWidth-50;
  }
  
  canvas = createCanvas(imgDimensions.w, imgDimensions.h);
  canvas.parent("canvas-div");
  background(235);
  noStroke();
}

function draw() {
  revealColor();
  testEllipse();
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
  pixel = display.get(mouseX, mouseY); //}
  pixel = averageColor(pixel, lastColor);
  pixel[3] = 10; //sets alpha to low value
  fill(pixel);
  let brushTemp = brushWeight;
  let brushFrac = brushTemp/25; //watercolour effect
  /*
  if (isPainting && (pmouseX != mouseX) && (pmouseY != mouseY)) {
    
    rotate(getStrokeAngle());
    translate(mouseX, mouseY)
    for(let i=0; i<15; i++){
    brushTemp -= brushFrac; 
    ellipse(mouseX, mouseY, brushTemp, 4);
    }
  }*/
  lastColor = pixel;
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

function fitImage(){
  
}


//prevents black lines when mouse moves off canvas
document
  .getElementById("canvas-div")
  .addEventListener("mouseenter", function() {
    isPainting = true;
  });
document.getElementById("canvas-div").addEventListener("mouseout", function() {
  isPainting = false;
});



/////////////////////////////////////////////////////////////

function testEllipse(){
  pixel[3] = 255;
  fill(pixel);
  console.log("angle:" + getStrokeAngle());
  
  rotate(getStrokeAngle()* -1);
  translate(mouseX, mouseY);
  ellipse(mouseX, mouseY, 35, 20)

}

function getStrokeAngle(){
  //return Math.atan((mouseY - pmouseY)/(mouseX - pmouseX))
  let a = atan2(mouseY - pmouseY, mouseX - pmouseX);
  return a;
}
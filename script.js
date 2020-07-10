/* global createCanvas, strokeWeight, stroke, line, colorMode, HSB,pmouseX, pmouseY background loadImage image resizeCanvas get mouseX, mouseY*/
let imgDimensions = { w: 640, h: 329 };
let userUrl =
  "https://cdn.glitch.com/f979082c-4790-4538-b5e9-dcd548a7bef6%2Fgoogle-background-1467806874.jpg?v=1594410010295";
let canvas, displayImg, pixel, brushWeight = 4, lastColor = [128, 128, 128, 255];


function preload() {
  displayImg = loadImage(userUrl);
}

function setup() {
  canvas = createCanvas(imgDimensions.w, imgDimensions.h);
  canvas.parent('canvas-div');
  strokeWeight(brushWeight);
}

function draw() {
  revealColor();
}

function getDimensions(url) {
  let userImage = new Image();
  userImage.src = url;
  return new Promise((resolve, reject) => {
    userImage.onload = function() {
      imgDimensions.w = this.width;
      imgDimensions.h = this.height;
      console.log(imgDimensions, "promiseresolved");
      resolve();
    };
  });
}

async function userUpload() {
  userUrl = window.prompt("Enter an image URL:");
  await getDimensions(userUrl);
  resizeCanvas(imgDimensions.w, imgDimensions.h);
  displayImg = loadImage(userUrl);
}

function revealColor(){
  //
    pixel = displayImg.get(mouseX, mouseY);//}
  //pixel = averageStroke(pixel);
  stroke(pixel);
  console.log(mouseX,mouseY)
  //if(mouseX<=imgDimensions.x && mouseY <= imgDimensions.y){
  line(pmouseX, pmouseY, mouseX, mouseY);//}
  lastColor = pixel;
}

function averageStroke(){
  
}



function mouseWheel(event) { //use mousewheel to control stroke weight
  print(event.delta);
  brushWeight += event.delta/50;
  strokeWeight(brushWeight)
}
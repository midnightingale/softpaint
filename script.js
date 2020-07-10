/* global createCanvas, strokeWeight, stroke, sq, windowWidth, line, windowHeight, colorMode, HSB,pmouseX, pmouseY background loadImage image resizeCanvas get mouseX, mouseY*/
let imgDimensions = { w: 640, h: 329 };
let imgUrl =
  "https://cdn.glitch.com/f979082c-4790-4538-b5e9-dcd548a7bef6%2Fgoogle-background-1467806874.jpg?v=1594410010295";
let canvas,
  displayImg,
  pixel,
  onCanvas=false,
  brushWeight = 4,
  lastColor = [128, 128, 128, 255];


function preload() {
  displayImg = loadImage(imgUrl);
}

function setup() {
  canvas = createCanvas(imgDimensions.w, imgDimensions.h);
  canvas.parent("canvas-div");
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
      adjustCanvas();
      resolve();
    };
  });
}

async function userUpload() {
  imgUrl = window.prompt("Enter an image URL:");
  await getDimensions(imgUrl);
  displayImg = loadImage(imgUrl);
  adjustCanvas();
}

async function randomUpload() {
  let randWidth = Math.floor(Math.random() * windowWidth + 150)
  let randHeight = Math.floor(Math.random() * windowHeight + 200)
  imgUrl = "https://picsum.photos/" + randWidth + "/" + randHeight;
  await getDimensions(imgUrl);
  displayImg = loadImage(imgUrl);
  adjustCanvas();
}

function revealColor() {
  pixel = displayImg.get(mouseX, mouseY); //}
  pixel = averageColor(pixel, lastColor);
  stroke(pixel);
  if(onCanvas){
  line(pmouseX, pmouseY, mouseX, mouseY);}
  lastColor = pixel;
}

function averageColor(color1, color2) {
  let avgColor = [];
  for (let i = 0; i < lastColor.length; i++) {
    avgColor[i] = Math.sqrt((sq(color1[i]) + sq(color2[i])) / 2);
  }
  return avgColor;
}

function mouseWheel(event) {
  brushWeight += event.delta / 50;
  strokeWeight(brushWeight);
}

function adjustCanvas() {
  resizeCanvas(imgDimensions.w, imgDimensions.h);
  console.log(imgDimensions);
  document.getElementById("canvas-div").style =
    "width: " + imgDimensions.w + "px";
  document.getElementById("canvas-div").style =
    "height: " + imgDimensions.h-100 + "px";
}

//prevents black lines when mouse moves off canvas
document.getElementById("canvas-div").addEventListener("mouseenter", function() {onCanvas=true;});
document.getElementById("canvas-div").addEventListener("mouseout", function() {onCanvas=false;});
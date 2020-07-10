/* global createCanvas, strokeWeight, stroke, sq, windowWidth, line, windowHeight, colorMode, HSB,pmouseX, pmouseY background loadImage image resizeCanvas get mouseX, mouseY*/
let imgDimensions = { w: 640, h: 329 };
let userUrl =
  "https://cdn.glitch.com/f979082c-4790-4538-b5e9-dcd548a7bef6%2Fgoogle-background-1467806874.jpg?v=1594410010295";
let canvas,
  displayImg,
  pixel,
  brushWeight = 4,
  lastColor = [128, 128, 128, 255];

function preload() {
  displayImg = loadImage(userUrl);
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
  userUrl = window.prompt("Enter an image URL:");
  await getDimensions(userUrl);
  displayImg = loadImage(userUrl);
  adjustCanvas();
}

async function randomUpload() {
  let randWidth = Math.floor(Math.random() * windowWidth + 150)
  let randHeight = Math.floor(Math.random() * windowHeight + 200)
  userUrl = "https://picsum.photos/" + randWidth + "/" + randHeight;
  await getDimensions(userUrl);
  displayImg = loadImage(userUrl);
  adjustCanvas();
}

function revealColor() {
  pixel = displayImg.get(mouseX, mouseY); //}
  //pixel = averageStroke(pixel);
  stroke(pixel);
  //if(mouseX<=imgDimensions.x && mouseY <= imgDimensions.y){
  line(pmouseX, pmouseY, mouseX, mouseY); //}
  lastColor = pixel;
}

function averageStroke(colorIn) {
  let avgColor = [];
  for (let i = 0; i < lastColor.length; i++) {
    avgColor[i] = Math.sqrt((sq(colorIn[i]) + sq(lastColor[i])) / 2);
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
    "height: " + imgDimensions.h + "px";
}

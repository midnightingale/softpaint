/* global createCanvas, cursor, strokeWeight, stroke, sq, windowWidth, line, windowHeight, colorMode, HSB,pmouseX, pmouseY background loadImage image resizeCanvas get mouseX, mouseY*/

//default values
let imgDimensions = { w: 570, h: 450 };
let imgUrl =
  "https://cdn.glitch.com/ed00bc65-49f7-4b45-ad53-f1dcea7aba31%2Fil_570xN.1424060518_k0dd.jpg?v=1594424247188";
let canvas,
  displayImg,
  pixel,
  onCanvas = false,
  brushWeight = 6,
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
  if(onCanvas){
    cursor()
  }
}

/*images take time to load, so this function returns a Promise that 
causes other functions to wait until it's done*/
function getDimensions(url) {
  let userImage = new Image();
  userImage.src = url;
  userImage.onerror = function() {
      document.getElementById("error-display").innerHTML = "Sorry, we can't load that image.";
    };
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

//resizes canvas-div to match new image, or throws error if image is unreachable 
async function userUpload() {
  imgUrl = window.prompt("Enter an image URL:");
  await getDimensions(imgUrl);
  displayImg = loadImage(imgUrl);
  adjustCanvas();
}

//gets new photo from picsum.photos
async function randomUpload() {
  let randWidth = Math.min(Math.max(Math.floor(Math.random() * windowWidth), 150), windowWidth);
  let randHeight = Math.min(Math.max(Math.floor(Math.random() * windowHeight), 200), windowHeight);
  imgUrl = "https://picsum.photos/" + randWidth + "/" + randHeight;
  await getDimensions(imgUrl);
  displayImg = loadImage(imgUrl);
  adjustCanvas();
}

//draws a line based on pmouse{X,Y} and mouse{X,Y} of the average color between the two points
function revealColor() {
  pixel = displayImg.get(mouseX, mouseY); //}
  pixel = averageColor(pixel, lastColor);
  stroke(pixel);
  if (onCanvas) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  lastColor = pixel;
}

//calculates the average color between two RGBA values using a squared-mean method
function averageColor(color1, color2) {
  let avgColor = [];
  for (let i = 0; i < lastColor.length; i++) {
    avgColor[i] = Math.sqrt((sq(color1[i]) + sq(color2[i])) / 2);
  }
  return avgColor;
}

function mouseWheel(event) {
  brushWeight += event.delta / 100;
  strokeWeight(brushWeight);
}

function adjustCanvas() {
  resizeCanvas(imgDimensions.w, imgDimensions.h);
  document.getElementById("canvas-div").style =
    "width: " + imgDimensions.w + "px";
  document.getElementById("canvas-div").style =
    "height: " + imgDimensions.h - 100 + "px";
}

//prevents black lines when mouse moves off canvas
document
  .getElementById("canvas-div")
  .addEventListener("mouseenter", function() {
    onCanvas = true;
  });
document.getElementById("canvas-div").addEventListener("mouseout", function() {
  onCanvas = false;
});

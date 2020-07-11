/* global createCanvas, noStroke, ellipse, fill, cursor, saveCanvas, strokeWeight, stroke, sq, windowWidth, line, windowHeight, colorMode, HSB,pmouseX, pmouseY background loadImage image resizeCanvas get mouseX, mouseY*/

//default values
let imgDimensions = { w: 570, h: 450 };
let imgUrl =
  "https://cdn.glitch.com/ed00bc65-49f7-4b45-ad53-f1dcea7aba31%2Fil_570xN.1424060518_k0dd.jpg?v=1594424247188";
let canvas,
  displayImg,
  pixel,
  isPainting = false,
  brushWeight = 45,
  lastColor = [128, 128, 128, 20];

function preload() {
  displayImg = loadImage(imgUrl, null, imageError);
}

function setup() {
  canvas = createCanvas(imgDimensions.w, imgDimensions.h);
  canvas.parent("canvas-div");
  noStroke();
}

function draw() {
  revealColor();
}

/*images take time to load, so this function returns a Promise that 
causes other functions to wait until it's done*/
function getDimensions(url) {
  let userImage = new Image();
  userImage.src = url;
  userImage.onerror = imageError();
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
  imgUrl = window.prompt("Enter an image URL:", "filename.png, .jpg, etc.");
  await getDimensions(imgUrl);
  displayImg = loadImage(imgUrl, null, imageError);
  adjustCanvas();
}

//gets new photo from picsum.photos, with dimensions < window size
async function randomUpload() {
  let randWidth = Math.min(
    Math.max(Math.floor(Math.random() * windowWidth), 150),
    windowWidth
  );
  let randHeight = Math.min(
    Math.max(Math.floor(Math.random() * windowHeight), 200),
    windowHeight
  );
  imgUrl = "https://picsum.photos/" + randWidth + "/" + randHeight;
  await getDimensions(imgUrl);
  displayImg = loadImage(imgUrl, null, imageError);
  adjustCanvas();
}

//draws a line based on pmouse{X,Y} and mouse{X,Y} of the average color between the two points
function revealColor() {
  pixel = displayImg.get(mouseX, mouseY); //}
  pixel = averageColor(pixel, lastColor);
  pixel[3] = 10;
  fill(pixel);
  let brushTemp = brushWeight;
  let brushFrac = brushTemp/25; //watercolour effect
  
  if (isPainting) {
    for(let i=0; i<15; i++){
    brushTemp -= brushFrac ; 
    ellipse(mouseX, mouseY, brushTemp);
    }
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

function imageError() {
    document.getElementById("error-display").innerHTML =
      "Image pending (or retrieval failed)...";
  };

function savePainting(){
  saveCanvas('myPainting', 'png');
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

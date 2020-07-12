//resizes canvas-div to match new image, or throws error if image is unreachable
async function userLink() {
  imgUrl = window.prompt(
    "Enter an image URL:",
    ".jpg, .png, etc."
  );
  await getDimensions(imgUrl);
  display = loadImage(imgUrl, null, imageError);
  adjustCanvas();
  document.getElementById("source-link").innerHTML = "";
}

async function userUpload(event){
  let uploadUrl = URL.createObjectURL(event.target.files[0]);
  console.log(uploadUrl);
  await getDimensions(uploadUrl);
  display = loadImage(uploadUrl);
  adjustCanvas();
  document.getElementById("source-link").innerHTML = "";
}

/*
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
*/

//gets new photo from picsum.photos, with dimensions < window size
async function randomLink() {
  let randWidth = Math.min(
    Math.max(Math.floor(Math.random() * (windowWidth - 50)), 300),
    windowWidth - 50
  );
  let randHeight = Math.min(
    Math.max(Math.floor(Math.random() * (windowHeight - 200)), 450),
    windowHeight - 200
  );
  imgUrl =
    "https://picsum.photos/seed/" +
    Math.floor(Math.random() * 9999) +
    "/" +
    randWidth +
    "/" +
    randHeight;

  await getDimensions(imgUrl);
  display = loadImage(imgUrl);
  adjustCanvas();
  document.getElementById("source-link").innerHTML = "view original";
  document.getElementById("source-link").href = imgUrl;
}

function imageError() {
  document.getElementById("error-display").innerHTML =
    "Sorry, we couldn't load that image. Try another!";
}

function savePainting() {
  saveCanvas("softpainting", "png");
}

function mouseWheel(event) {
  brushWeight -= event.delta / 50;
  brushWeight = abs(brushWeight);
  displayBrushSize();
}

function updateSlider(amount){
  brushWeight = amount;
  displayBrushSize();
}

function displayBrushSize(){
  document.getElementById("instruction").innerHTML =
    "scroll to change || brush size: " + brushWeight ;
  document.getElementById("slider").value = Math.min(brushWeight, 100);
}

function drawTouchPrompt(){
  fill(120);
  textSize(16);
  textFont(jost);
  rectMode(CENTER);
    textAlign(CENTER, CENTER);
  
    text('touch to start', imgDimensions.w/2, imgDimensions.h/2)
}

/* global createCanvas, textSize, rectMode, jost, textFont, brushWeight,imgDimensions, textAlign, text, CENTER, abs, display, getDimensions, imgUrl, adjustCanvas, noStroke, ellipse, fill, cursor, saveCanvas, strokeWeight, stroke, sq, windowWidth, line, windowHeight, colorMode, HSB,pmouseX, pmouseY background loadImage image resizeCanvas get mouseX, mouseY*/

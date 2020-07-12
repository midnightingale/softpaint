async function userUpload(event) {
  let uploadUrl = URL.createObjectURL(event.target.files[0]);
  await getDimensions(uploadUrl);
  display = loadImage(uploadUrl);
  imgUrl = uploadUrl;
  updateSourceLink();
  display.resize(imgDimensions.w, imgDimensions.h);
}

//gets new photo from picsum.photos, with dimensions < window size
async function randomLink() {
  let randWidth = Math.min(
    Math.max(Math.floor(Math.random() * (windowWidth - 50)), 300),
    windowWidth - 50
  );
  let randHeight = Math.min(
    Math.max(Math.floor(Math.random() * (windowHeight - 200)), 450),
    windowHeight - 230
  );
  imgUrl =
    "https://source.unsplash.com/featured/"+//collection/11408131/"+
     +
    randWidth +
    "x" +
    randHeight+
    "?nature/"
  await getDimensions(imgUrl);
  display = loadImage(imgUrl);
  adjustCanvas();
}

function updateSourceLink(sourceExists = true){
  if(sourceExists){
    document.getElementById("source-link").innerHTML = "view original";
    document.getElementById("source-link").href = imgUrl;
  } else{
    document.getElementById("source-link").innerHTML = "";
  }
}

function imageError() {
  document.getElementById("error-display").innerHTML =
    "Sorry, we couldn't load that image. Try another!";
}

function savePainting() {
  saveCanvas("mysoftpainting", "png");
}

function mouseWheel(event) {
    if(abs(event.delta)>3){
      brushWeight -= Math.floor(event.delta/50);
    } else{
      brushWeight -= Math.floor(event.delta);
    }
    brushWeight = abs(brushWeight);
    displayBrushSize();
}

function updateSlider(amount) {
  brushWeight = amount;
  displayBrushSize();
}

function displayBrushSize() {
  document.getElementById("instruction").innerHTML =
    "scroll to widen || brush size: " + brushWeight + " ||&nbsp;";
  document.getElementById("slider").value = Math.min(brushWeight, 100);
}

function drawTouchPrompt() {
  fill(120);
  textSize(16);
  textFont(jost);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  text("touch to start", imgDimensions.w / 2, imgDimensions.h / 2);
}

//deprecated
async function userLink() {
  imgUrl = window.prompt("Enter an image URL:", ".jpg, .png, etc.");
  await getDimensions(imgUrl);
  display = loadImage(imgUrl, null, imageError);
  document.getElementById("source-link").innerHTML = "";
}

/* global createCanvas, fitImage, textSize, rectMode, jost, textFont, brushWeight,imgDimensions, textAlign, text, CENTER, abs, display, getDimensions, imgUrl, adjustCanvas, noStroke, ellipse, fill, cursor, saveCanvas, strokeWeight, stroke, sq, windowWidth, line, windowHeight, colorMode, HSB,pmouseX, pmouseY background loadImage image resizeCanvas get mouseX, mouseY*/

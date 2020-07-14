async function userUpload(event) {
  let uploadUrl = URL.createObjectURL(event.target.files[0]);
  await getDimensions(uploadUrl);
  displayed = loadImage(uploadUrl);
  imgUrl = uploadUrl;
  updateSourceLink();
  displayed.resize(imgDimensions.w, imgDimensions.h);
}

async function randomLink() {
  let randWidth = Math.min(
    Math.max(Math.floor(Math.random() * (windowWidth - 50)), 300),
    windowWidth - 50
  );
  let randHeight = Math.min(
    Math.max(Math.floor(Math.random() * (windowHeight - 200)), windowHeight/2),
    windowHeight - 230
  );
  imgUrl =
    "https://source.unsplash.com/collection/11408131/"+
     +
    randWidth +
    "x" +
    randHeight+
    "/"

  await getDimensions(imgUrl);
  displayed = loadImage(imgUrl);
  adjustCanvas();
  fixUnsplashSrc(imgUrl)
}

function fixUnsplashSrc(unsplashsrc){
  fetch(unsplashsrc).then( data => {
  imgUrl = data.url; 
  updateSourceLink();               
});
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
    brushWeight -= Math.sign(event.delta)
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

function openModal(){
  
}

//deprecated
async function userLink() {
  imgUrl = window.prompt("Enter an image URL:", ".jpg, .png, etc.");
  await getDimensions(imgUrl);
  displayed = loadImage(imgUrl, null, imageError);
  document.getElementById("source-link").innerHTML = "";
}


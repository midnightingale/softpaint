//resizes canvas-div to match new image, or throws error if image is unreachable
async function userUpload() {
  imgUrl = window.prompt("Enter an image URL:", "[.jpg, .png, etc. from any image hosting site]");
  await getDimensions(imgUrl);
  displayImg = loadImage(imgUrl, null, imageError);
  adjustCanvas();
  document.getElementById("source-link").innerHTML = "";
}

//gets new photo from picsum.photos, with dimensions < window size
async function randomUpload() {
  let randWidth = Math.min(
    Math.max(Math.floor(Math.random() * (windowWidth-50)), 300),
    windowWidth-50
  );
  let randHeight = Math.min(
    Math.max(Math.floor(Math.random() * (windowHeight-200)), 450),
    windowHeight-200
  );
  imgUrl = "https://picsum.photos/seed/" + Math.floor(Math.random()*9999)+"/"+ randWidth + "/" + randHeight;

  await getDimensions(imgUrl);
  displayImg = loadImage(imgUrl);
  adjustCanvas();
  document.getElementById("source-link").innerHTML = "view source";
  document.getElementById("source-link").href = imgUrl;
}

function imageError() {
    document.getElementById("error-display").innerHTML =
      "Sorry, we couldn't load that image. Try another!";
  };

function savePainting(){
  saveCanvas('mySoftpoints', 'png');
}

function mouseWheel(event) {
  brushWeight -= event.delta / 50;
  document.getElementById("instruction").innerHTML =
      "scroll brush size: "+ brushWeight + " | hover to paint";
}


/* global createCanvas, brushWeight, displayImg, getDimensions, imgUrl, adjustCanvas, noStroke, ellipse, fill, cursor, saveCanvas, strokeWeight, stroke, sq, windowWidth, line, windowHeight, colorMode, HSB,pmouseX, pmouseY background loadImage image resizeCanvas get mouseX, mouseY*/

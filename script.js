/* global createCanvas,updateSourceLink,drawTouchPrompt,loadFont,textAlign, translate, displayBrushSize, rotate, noStroke, ellipse, fill, cursor, saveCanvas, strokeWeight, stroke, sq, windowWidth, line, windowHeight, colorMode, HSB,pmouseX, pmouseY background loadImage image resizeCanvas get mouseX, mouseY*/

let imgDimensions = { w: 0, h: 0 };
let imgUrl,
  canvas,
  display,
  pixel,
  jost,
  isPainting = false,
  notStarted = true,
  brushWeight = 30,
  lastColor = [128, 128, 128, 20];

function preload() {
  imgUrl =
    defaultPaintings[Math.floor(Math.random() * defaultPaintings.length)];
  imgUrl = "data:image/jpeg;base64,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"
  display = loadImage(imgUrl);
  
  jost = loadFont(
    "https://cdn.glitch.com/78391c90-30ed-44d7-8ca3-ccd51ddd2e05%2FJost-VariableFont_wght.ttf?v=1594528844941"
  );
}

function setup() {
  getDimensions(imgUrl);
  canvas = createCanvas(imgDimensions.w, imgDimensions.h);
  canvas.parent("canvas-div");
  background(235);
  brushWeight = Math.floor(windowWidth / 15);
  displayBrushSize();
  noStroke();
}

function draw() {
  if (isPainting && pmouseX != mouseX && pmouseY != mouseY) {
    revealColor();
  } else if (notStarted) {
    drawTouchPrompt();
  }
}

//updates dimensions and returns a Promise after image finishes loading
function getDimensions(url) {
  let image = new Image();
  image.src = url;
  return new Promise((resolve, reject) => {
    image.onload = function() {
      imgDimensions.w = this.width;
      imgDimensions.h = this.height;
      adjustCanvas();
      document.getElementById("error-display").innerHTML = "";
      updateSourceLink();
      resolve();
    };
  });
}

function revealColor() {
  display.resize(imgDimensions.w, imgDimensions.h);
  pixel = display.get(mouseX, mouseY);
  pixel = averageColor(pixel, lastColor);
  pixel[3] = 12; //sets alpha to low value for watercolor effect
  fill(pixel);

  let brushTemp = brushWeight;
  let brushFrac = brushTemp / 20;
  let speedTransform = calcSpeedTransform();
  let rotation = Math.atan2(mouseY - pmouseY, mouseX - pmouseX);
  let mainAxis, crossAxis;

  translate(mouseX, mouseY);
  rotate(rotation);

  for (let i = 0; i < 15; i++) {
    //layering for watercolor effect
    mainAxis = Math.min(
      Math.max(brushTemp * speedTransform[0], 5),
      brushTemp * 2
    );
    crossAxis = Math.min(Math.max(brushTemp * speedTransform[1], 0), brushTemp);
    ellipse(0, 0, mainAxis, crossAxis);
    brushTemp -= brushFrac;
  }
  lastColor = pixel;
}

function calcSpeedTransform() {
  let yval = Math.max(mouseY - pmouseY, 0.5); //ensure no division by 0
  let xval = Math.max(mouseX - pmouseX, 0.5);
  let speed = Math.min(Math.max(Math.sqrt(sq(yval) + sq(xval)), 1), 40); //restricted between [1,40]
  if (speed >= 40) {
    return [2, 0.5];
  }
  return [-10 / (speed - 40) + 1, Math.max(10 / (speed - 40) + 1, 1)];
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
  background(235);
  document.getElementById("canvas-div").width = imgDimensions.w + "px";
  document.getElementById("canvas-div").height = imgDimensions.h - 100 + "px";
}

function fitImage() {
  let minPicDim = Math.min(imgDimensions.w, imgDimensions.h);
  let minWindowDim = Math.min(windowWidth, windowHeight);
  if (minPicDim == imgDimensions.w) {
    imgDimensions.w =
      ((minWindowDim * 2) / 3) * (imgDimensions.w / imgDimensions.h);
    imgDimensions.h = (minWindowDim * 2) / 3;
  } else if (minPicDim == imgDimensions.h) {
    imgDimensions.h =
      (minWindowDim - 100) * (imgDimensions.h / imgDimensions.w);
    imgDimensions.w = minWindowDim - 100;
  }
}

//prevents black lines when mouse moves off canvas
document
  .getElementById("canvas-div")
  .addEventListener("mouseenter", function() {
    isPainting = true;
    if (notStarted) {
      notStarted = false;
      background(235);
    }
  });
document.getElementById("canvas-div").addEventListener("mouseout", function() {
  isPainting = false;
});

let defaultPaintings = [
  "https://cdn.glitch.com/ed00bc65-49f7-4b45-ad53-f1dcea7aba31%2Fil_570xN.1424060518_k0dd.jpg?v=1594424247188",
  "https://upload.wikimedia.org/wikipedia/commons/7/77/Vincent_van_Gogh_-_Van_Gogh%27s_Bedroom_in_Arles_-_Google_Art_Project.jpg",
  "https://collectionapi.metmuseum.org/api/collection/v1/iiif/488730/1004971/main-image",
  "https://static1.squarespace.com/static/5858d37b03596e9f5512deb4/58e68f676a4963e2fc190492/5bb3e7c0e4966bb96267baef/1538517489810/default.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/dc/Woman_in_Hat_and_Fur_Collar.jpg",
  "https://cdn.glitch.com/78391c90-30ed-44d7-8ca3-ccd51ddd2e05%2F4c90350d7c32a9b07b48470ca17469eb.jpg",
  "https://cdn.glitch.com/78391c90-30ed-44d7-8ca3-ccd51ddd2e05%2Fclocks-2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/75/Claude_Monet%2C_Le_Grand_Canal.jpg"
];
